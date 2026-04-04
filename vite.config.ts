import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: false,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/lib/index.ts'),
        components: resolve(__dirname, 'src/lib/components/index.ts'),
        sdui: resolve(__dirname, 'src/lib/sdui/index.ts'),
        utils: resolve(__dirname, 'src/lib/utils/index.ts'),
        services: resolve(__dirname, 'src/lib/services/index.ts'),
        types: resolve(__dirname, 'src/lib/types/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'js' : 'cjs'
        return `${entryName}.${ext}`
      },
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@mantine/core',
        '@mantine/hooks',
        '@tanstack/react-query',
        'axios',
        'echarts',
        'echarts-for-react',
        'mantine-react-table',
        'react-grid-layout',
        'react-router-dom',
        'zod',
        'zustand',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@mantine/core': 'MantineCore',
          '@mantine/hooks': 'MantineHooks',
          '@tanstack/react-query': 'ReactQuery',
          axios: 'axios',
          echarts: 'echarts',
          'echarts-for-react': 'EChartsForReact',
          'mantine-react-table': 'MantineReactTable',
          'react-grid-layout': 'ReactGridLayout',
          'react-router-dom': 'ReactRouterDOM',
          zod: 'Zod',
          zustand: 'Zustand',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
