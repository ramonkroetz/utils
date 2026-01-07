import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  outDir: 'lib',
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  external: ['@fingerprintjs/fingerprintjs'],
  platform: 'browser',
  minify: true,
  tsconfig: 'tsconfig.json',
})
