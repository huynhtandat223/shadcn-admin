import path from 'path'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), TanStackRouterVite()],
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),

        // fix loading all icon chunks in dev mode
        // https://github.com/tabler/tabler-icons/issues/1233
        '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
      },
    },
  }
}

// export default defineConfig({
//   plugins: [react(), TanStackRouterVite()],
//   server: {
//     port: parseInt(env.VITE_PORT),
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),

//       // fix loading all icon chunks in dev mode
//       // https://github.com/tabler/tabler-icons/issues/1233
//       '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
//     },
//   },
// })
