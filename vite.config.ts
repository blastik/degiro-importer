import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Packages the Wealthfolio addon sandbox provides at runtime (ESM, bare
// specifiers). Must stay in sync with `hostDependencies` in manifest.json.
const hostProvidedDependencies = [
  '@wealthfolio/addon-sdk',
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
];

export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    target: ['chrome107', 'edge107', 'firefox104', 'safari16'],
    lib: {
      entry: 'src/addon.tsx',
      formats: ['es'],
      fileName: () => 'addon.js', // force .js extension expected by manifest
    },
    outDir: 'dist',
    rollupOptions: {
      external: hostProvidedDependencies,
    },
    minify: false,
    sourcemap: true,
  },
});
