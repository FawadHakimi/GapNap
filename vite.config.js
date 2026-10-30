import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' works on GitHub Pages. To use an absolute path instead, set '/your-repo-name/'.
export default defineConfig({ base: './', plugins: [react()] });
