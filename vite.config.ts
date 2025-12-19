
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    // QUAN TRỌNG: Sử dụng './' để đường dẫn trở thành tương đối.
    // Giúp web chạy được trên mọi Hosting (GitHub Pages, Vercel...) hoặc thư mục con bất kỳ.
    base: './', 
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/app-lich/',  // ← Thêm dòng này, đúng tên repo
})
