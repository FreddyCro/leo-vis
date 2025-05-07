import { defineConfig, loadEnv } from 'vite';
import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig((mode) => {
  // loadEnv(mode, root, prefix)
  const env = loadEnv('', process.cwd());
  console.log('env', env);

  return {
    plugins: [
      vue(),
      viteCompression(),
      tailwindcss(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: { title: 'My App' },
        },
      }),
    ],
    optimizeDeps: {
      include: ['@udn-digital-center/common-components > vue-scrollto'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/mixins.scss" as *;
            @use "@/assets/styles/variables.scss" as *;
          `,
        },
      },
    },
  };
});
