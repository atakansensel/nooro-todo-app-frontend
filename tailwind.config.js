export default {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        card: {
          red: '#fecaca',
          blue: '#bfdbfe',
          green: '#bbf7d0',
          yellow: '#fef08a',
          purple: '#e9d5ff'
        }
      }
    },
  },
  plugins: [],
}