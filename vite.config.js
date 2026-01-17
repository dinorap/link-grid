import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // Cho phép truy cập từ mạng LAN
    port: 5173, // Port mặc định của Vite
    strictPort: false // Tự động tìm port khác nếu port đã được sử dụng
  },
  base: '/link-grid/' // Tên repo của Boss
})

