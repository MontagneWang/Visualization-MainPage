import {defineConfig, type PluginOption} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// @ts-ignore
// import inject from '@rollup/plugin-inject';  // 效果和webpack.ProvidePlugin中相同
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import {visualizer} from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		visualizer({
			open: true
		}) as PluginOption,
	],
	css: {
		preprocessorOptions: {
				scss: {
						additionalData: `@import './src/global.scss';`,
				},
		},
},
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
})
