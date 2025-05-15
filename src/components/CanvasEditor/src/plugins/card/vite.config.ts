import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/plugins/card/index.ts',
      name: 'CardPlugin',
      fileName: 'card-plugin'
    },
    rollupOptions: {
      // 如果 editor 是外部依赖（主项目会提供），这里要 external
      external: ['canvas-editor'], // 假设主项目叫 canvas-editor
      output: {
        globals: {
          'canvas-editor': 'CanvasEditor'
        }
      }
    }
  }
})