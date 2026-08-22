# Astro Toolbox 项目规范

## 1. 项目目标
构建个人网站系统：博客 + 工具箱 + Agent + TTS

---

## 2. 技术栈
- Astro
- React
- Vue
- TailwindCSS
- 外部 API（TTS / LLM）

---

## 3. 架构原则
- 博客：Markdown
- 工具：React / Vue islands
- API：外部服务

---

## 4. 混合框架规则
- React/Vue 必须 client:load
- 状态不跨框架共享

---

## 5. 工具模块
TTS / Agent / 小工具扩展

---

## 6. 构建命令
npm run dev / build / preview
