import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server:{
    host: true,
    strictPort: true, 
    // allowedHosts: [
    //   '.ngrok-free.app', 
    //   '.ngrok-free.dev'  ,
    //   'https://f875-196-128-164-59.ngrok-free.app/'
    // ]
  }
})
