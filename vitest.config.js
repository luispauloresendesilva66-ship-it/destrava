import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['supabase/functions/_shared/**/*.test.js', 'scripts/**/*.test.js'],
    passWithNoTests: true,
  },
})
