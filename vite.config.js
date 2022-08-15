// vite.config.js
import vue from '@vitejs/plugin-vue'
//按需加载
import styleImport from 'vite-plugin-style-import';
/**
 * @type {import('vite').UserConfig}
 */
// 引入Unocss
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss'
export default {
  plugins: [vue(),
    Unocss({ // 使用Unocss
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()],
    }),
    styleImport({
    libs: [{
      libraryName: 'ant-design-vue',
      esModule: true,
      resolveStyle: (name) => {
        return `ant-design-vue/es/${name}/style/css`;
      },
    }]
  })],
  base: "./",
  build: {
    assetsDir: "asset/"
  }
}