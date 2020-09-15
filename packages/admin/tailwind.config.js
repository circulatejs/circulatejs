module.exports = {
  purge: ['./src/**/*.vue', './src/**/*.html', './src/base.css', './src/main.js'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      colors: {
        c: {
          blue: '#2361d3'
        }
      },
      boxShadow: {
        menu: '5px 0 8px 0px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
}
