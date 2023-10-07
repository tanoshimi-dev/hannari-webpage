import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   VITE_R3F_ASSET_PATH: JSON.stringify('KEY:XXX-XXX'),
  // },

})
