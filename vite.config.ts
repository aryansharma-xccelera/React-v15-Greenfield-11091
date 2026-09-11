import react from '@vitejs/plugin-react'

export default {
  plugins: [react({ jsxRuntime: 'classic' })],
  server: {
    port: 41247,
    strictPort: true,
    allowedHosts: ['.trycloudflare.com'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
}
