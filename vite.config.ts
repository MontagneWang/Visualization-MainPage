import {defineConfig, type PluginOption} from 'vite'
import vue from '@vitejs/plugin-vue'
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
})
