module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'custom-properties': false
      }
    },
    '@fullhuman/postcss-purgecss': {
      content: [
        './pages/**/*.{js,jsx,ts,tsx,scss}',
        './templates/**/*.{js,jsx,ts,tsx,scss}',
        './partials/**/*.{js,jsx,ts,tsx,scss}',
        './components/**/*.{js,jsx,ts,tsx,scss}',
        './styles/**/*.{scss,css}',
        './.storybook/doc-blocks/**/*.{js,jsx,ts,tsx,css}'
      ],
      safelist: {
        standard: ['html', 'body']
      },
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
    }
  }
};
