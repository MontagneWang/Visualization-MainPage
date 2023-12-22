// vite.config.ts
import { defineConfig } from "file:///D:/%E5%B1%B1%E9%81%A5%E8%B7%AF%E8%BF%9C/Coding/Project/Ling's%20Visualization/main-page/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/%E5%B1%B1%E9%81%A5%E8%B7%AF%E8%BF%9C/Coding/Project/Ling's%20Visualization/main-page/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/%E5%B1%B1%E9%81%A5%E8%B7%AF%E8%BF%9C/Coding/Project/Ling's%20Visualization/main-page/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/%E5%B1%B1%E9%81%A5%E8%B7%AF%E8%BF%9C/Coding/Project/Ling's%20Visualization/main-page/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///D:/%E5%B1%B1%E9%81%A5%E8%B7%AF%E8%BF%9C/Coding/Project/Ling's%20Visualization/main-page/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { visualizer } from "file:///D:/%E5%B1%B1%E9%81%A5%E8%B7%AF%E8%BF%9C/Coding/Project/Ling's%20Visualization/main-page/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    visualizer({
      open: true
    })
  ]
  // server: {
  // 	port: 5173,
  // 	proxy: {
  // 		'/api': {
  // 			// target: 'https://api.bilibili.com',
  // 			target: 'http://127.0.0.1',
  // 			changeOrigin: true,
  // 			rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
  // 		}
  // 	}
  // }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTVDNzFcdTkwNjVcdThERUZcdThGRENcXFxcQ29kaW5nXFxcXFByb2plY3RcXFxcTGluZydzIFZpc3VhbGl6YXRpb25cXFxcbWFpbi1wYWdlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxcdTVDNzFcdTkwNjVcdThERUZcdThGRENcXFxcQ29kaW5nXFxcXFByb2plY3RcXFxcTGluZydzIFZpc3VhbGl6YXRpb25cXFxcbWFpbi1wYWdlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8lRTUlQjElQjElRTklODElQTUlRTglQjclQUYlRTglQkYlOUMvQ29kaW5nL1Byb2plY3QvTGluZydzJTIwVmlzdWFsaXphdGlvbi9tYWluLXBhZ2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQge2RlZmluZUNvbmZpZywgdHlwZSBQbHVnaW5PcHRpb259IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuLy8gQHRzLWlnbm9yZVxuLy8gaW1wb3J0IGluamVjdCBmcm9tICdAcm9sbHVwL3BsdWdpbi1pbmplY3QnOyAgLy8gXHU2NTQ4XHU2NzlDXHU1NDhDd2VicGFjay5Qcm92aWRlUGx1Z2luXHU0RTJEXHU3NkY4XHU1NDBDXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7RWxlbWVudFBsdXNSZXNvbHZlcn0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuaW1wb3J0IHt2aXN1YWxpemVyfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRwbHVnaW5zOiBbXG5cdFx0dnVlKCksXG5cdFx0QXV0b0ltcG9ydCh7XG5cdFx0XHRyZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuXHRcdH0pLFxuXHRcdENvbXBvbmVudHMoe1xuXHRcdFx0cmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcblx0XHR9KSxcblx0XHR2aXN1YWxpemVyKHtcblx0XHRcdG9wZW46IHRydWVcblx0XHR9KSBhcyBQbHVnaW5PcHRpb24sXG5cdF0sXG5cdC8vIHNlcnZlcjoge1xuXHQvLyBcdHBvcnQ6IDUxNzMsXG5cdC8vIFx0cHJveHk6IHtcblx0Ly8gXHRcdCcvYXBpJzoge1xuXHQvLyBcdFx0XHQvLyB0YXJnZXQ6ICdodHRwczovL2FwaS5iaWxpYmlsaS5jb20nLFxuXHQvLyBcdFx0XHR0YXJnZXQ6ICdodHRwOi8vMTI3LjAuMC4xJyxcblx0Ly8gXHRcdFx0Y2hhbmdlT3JpZ2luOiB0cnVlLFxuXHQvLyBcdFx0XHRyZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpIC8vIFx1NEUwRFx1NTNFRlx1NEVFNVx1NzcwMVx1NzU2NXJld3JpdGVcblx0Ly8gXHRcdH1cblx0Ly8gXHR9XG5cdC8vIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStYLFNBQVEsb0JBQXNDO0FBQzdhLE9BQU8sU0FBUztBQUloQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFRLDJCQUEwQjtBQUNsQyxTQUFRLGtCQUFpQjtBQUd6QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUixJQUFJO0FBQUEsSUFDSixXQUFXO0FBQUEsTUFDVixXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNsQyxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVixXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNsQyxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVixNQUFNO0FBQUEsSUFDUCxDQUFDO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFZRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
