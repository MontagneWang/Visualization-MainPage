import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
// import inject from '@rollup/plugin-inject';  // 必须重要！效果和webpack.ProvidePlugin中相同

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      // inject({
      //     $: "jquery",  // 这里会自动载入 node_modules 中的 jquery   jquery全局变量
      //     jQuery: "jquery",
      //     "windows.jQuery": "jquery"
      // })
  ],
})
