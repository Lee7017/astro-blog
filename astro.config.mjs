// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

// Keep the existing Cloudflare Pages deployment at /.
// GitHub Pages uses /astro-blog/ when the GitHub Actions workflow builds it.
const githubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  ...(githubPages
    ? { site: 'https://lee7017.github.io', base: '/astro-blog' }
    : {}),
  integrations: [react(), vue()],
  vite: {
    plugins: [tailwindcss()]
  }
});
