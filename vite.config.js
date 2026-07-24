// vite.config.js
//
// WHY THE PROXY EXISTS:
//   When you run "npm run dev" locally, Vite serves your React
//   app on http://localhost:5173.
//
//   But /api/claude is a Vercel serverless function — it doesn't
//   exist during local development unless you use "vercel dev".
//
//   The proxy below tells Vite: "if the browser calls /api/...,
//   forward that request to http://localhost:3000/api/..." so
//   you can test the function locally with "vercel dev".
//
// LOCAL DEV WORKFLOW:
//   1. Install Vercel CLI:   npm i -g vercel
//   2. Run locally:          vercel dev          (port 3000 by default)
//   3. OR run Vite only:     npm run dev         (API calls will fail locally,
//                                                  but works fine on Vercel)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // Forwards /api/* from Vite dev server to vercel dev server
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
