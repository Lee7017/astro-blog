// POST /api/publish —— 在线发布文章
// 接收 { title, content, password }，通过 GitHub API 往仓库提交 md 文件，
// 触发 Cloudflare Pages 自动构建。密钥全部在本 Function 内，前端不接触。
export async function onRequestPost({ request, env }) {
  const json = (obj, status = 200) =>
    new Response(JSON.stringify(obj), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  // ---- 1. 解析请求 ----
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: '请求体不是合法 JSON' }, 400);
  }
  const { title, content, password } = data;

  // ---- 2. 密码校验（简单但够用的个人认证） ----
  if (!password || password !== env.ADMIN_PASSWORD) {
    return json({ error: '密码错误' }, 401);
  }
  if (!title?.trim() || !content?.trim()) {
    return json({ error: '标题和正文不能为空' }, 400);
  }

  // ---- 3. 生成文件名与日期（东八区） ----
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const date = `${get('year')}-${get('month')}-${get('day')}`;
  // 文件名用日期+时间戳，避免中文/特殊字符问题
  const slug = `${date}-${get('hour')}${get('minute')}${get('second')}`;

  // ---- 4. 拼装 md（frontmatter + 正文） ----
  const safeTitle = title.trim().replace(/"/g, '\\"');
  const body =
    `---\ntitle: "${safeTitle}"\ndate: ${date}\n---\n\n${content.trim()}\n`;

  // UTF-8 安全的 base64（btoa 不支持中文，先编码字节）
  const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(body)));

  // ---- 5. 提交到 GitHub ----
  const res = await fetch(
    `https://api.github.com/repos/${env.GITHUB_REPO}/contents/src/content/${slug}.md`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `post: ${title.trim()}`,
        content: b64,
        branch: 'main',
      }),
    }
  );

  if (!res.ok) {
    return json(
      { error: `GitHub API 返回 ${res.status}`, detail: await res.text() },
      502
    );
  }

  return json({ ok: true, file: `src/content/${slug}.md` });
}
