import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        collection: resolve(__dirname, 'collection.html'),
        product: resolve(__dirname, 'product.html'),
      },
    },
  },
});
