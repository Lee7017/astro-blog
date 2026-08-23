import { useState } from 'react';

export default function AdminEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // {type: 'busy'|'ok'|'err', msg}

  const publish = async () => {
    if (!title.trim() || !content.trim()) {
      setStatus({ type: 'err', msg: '标题和正文不能为空' });
      return;
    }
    if (!password) {
      setStatus({ type: 'err', msg: '请输入发布密码' });
      return;
    }
    setStatus({ type: 'busy', msg: '发布中，正在提交到 GitHub …' });
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setStatus({
        type: 'ok',
        msg: '发布成功！已提交到 GitHub，约 1~2 分钟后自动构建上线，届时可在「博客」页看到。',
      });
      setTitle('');
      setContent('');
    } catch (e) {
      setStatus({ type: 'err', msg: `发布失败：${e.message}` });
    }
  };

  const inputCls =
    'w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400';

  return (
    <div className="space-y-4">
      <input
        className={inputCls}
        placeholder="标题"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={`${inputCls} h-64 font-mono`}
        placeholder="正文（支持 Markdown）……"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-3">
        <input
          className={inputCls}
          type="password"
          placeholder="发布密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded px-6 py-2 whitespace-nowrap"
          disabled={status?.type === 'busy'}
          onClick={publish}
        >
          {status?.type === 'busy' ? '发布中…' : '发布'}
        </button>
      </div>

      {status && (
        <p
          className={
            status.type === 'ok'
              ? 'text-green-600'
              : status.type === 'err'
                ? 'text-red-600'
                : 'text-gray-500'
          }
        >
          {status.msg}
        </p>
      )}
    </div>
  );
}
