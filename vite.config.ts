import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

const isLibBuild = process.env.LIB_BUILD === '1'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function getAppManualChunk(id: string) {
  if (!id.includes('node_modules')) {
    return undefined
  }

  if (id.includes('/react-router/')) {
    return 'vendor-router'
  }

  if (id.includes('/react-dom/') || id.includes('/react/')) {
    return 'vendor-react'
  }

  if (id.includes('/lucide-react/')) {
    return 'vendor-icons'
  }

  if (
    id.includes('/recharts/') ||
    id.includes('/d3-') ||
    id.includes('/victory-vendor/')
  ) {
    return 'vendor-charts'
  }

  if (id.includes('/@radix-ui/')) {
    return 'vendor-radix'
  }

  if (id.includes('/@mui/') || id.includes('/@emotion/')) {
    return 'vendor-mui'
  }

  if (id.includes('/react-dnd/') || id.includes('/dnd-core/') || id.includes('/react-dnd-html5-backend/')) {
    return 'vendor-dnd'
  }

  if (
    id.includes('/motion/') ||
    id.includes('/date-fns/') ||
    id.includes('/react-day-picker/') ||
    id.includes('/embla-carousel-react/') ||
    id.includes('/react-hook-form/') ||
    id.includes('/sonner/') ||
    id.includes('/vaul/')
  ) {
    return 'vendor-ui'
  }

  return 'vendor-misc'
}

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
        rollupOptions: {
          output: {
            manualChunks: getAppManualChunk,
          },
        },
      },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
