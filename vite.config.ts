import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import tailwindcss from '@tailwindcss/vite';
import meta from './src/locales/meta.json';

// https://vite.dev/config/
export default defineConfig((mode) => {
  // loadEnv(mode, root, prefix)
  const env = loadEnv('', process.cwd());
  const { VITE_URL, VITE_MODE } = env;
  // console.log('env', env);

  return {
    base: VITE_URL,
    plugins: [
      vue(),
      viteCompression(),
      tailwindcss(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: meta.metaTitle,
            description: meta.metaDesc,
            x_description: meta.metaXDesc,
            keywords: meta.metaKeywords,
            url: VITE_URL,
            // url: meta.metaURL,
            image: meta.metaImage,
            robot:
              VITE_MODE === 'production'
                ? 'index, follow'
                : 'noindex, nofollow',
          },
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
