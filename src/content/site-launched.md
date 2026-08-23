---
title: 站点上线记录
date: 2026-08-23
---

今天，这个 Astro 小站正式上线 Cloudflare Pages 了。

## 从 Hexo 到 Astro

之前的老博客用 Hexo 搭在 GitHub Pages 上，跑了几年一直很稳定。这次换 Astro，主要想解决三件事：

- 写博客之外，还想做一些小工具（比如 TTS）
- 顺便熟悉 React 和 Vue 的组件开发
- 让部署链路更省心——push 即部署

## 现在的部署流程

整套链路非常短：

1. 本地改代码、写 Markdown
2. `git push` 到 GitHub
3. Cloudflare Pages 自动构建，一两分钟后上线

没有手动发布步骤，没有服务器要维护。

## 接下来

- 继续把 TTS 工具的后端接口补上
- 折腾自定义域名
- 把老博客的文章慢慢搬过来

以上，开个头。
