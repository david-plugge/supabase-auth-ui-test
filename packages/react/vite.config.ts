import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    react({
      // jsxRuntime: 'classic',
    }),
    dts({
      include: ['src/lib'],
      // insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.dependencies)],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});

