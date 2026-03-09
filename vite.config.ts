import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

const isLibBuild = process.env.LIB_BUILD === '1'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    ...(isLibBuild
      ? [
          dts({
            entryRoot: path.resolve(__dirname, './src/lib'),
            outDir: path.resolve(__dirname, './dist/lib'),
            include: ['src/lib/**/*'],
            tsconfigPath: path.resolve(__dirname, './tsconfig.json'),
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: isLibBuild
    ? {
        outDir: 'dist/lib',
        emptyOutDir: true,
        lib: {
          entry: {
            index: path.resolve(__dirname, './src/lib/index.ts'),
            shell: path.resolve(__dirname, './src/lib/shell.ts'),
            screens: path.resolve(__dirname, './src/lib/screens.ts'),
            demo: path.resolve(__dirname, './src/lib/demo.ts'),
          },
          formats: ['es'],
          fileName: (_format, entryName) => `${entryName}.js`,
          cssFileName: 'styles',
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react-router'],
        },
      }
    : {
        outDir: 'dist/app',
        emptyOutDir: true,
      },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
