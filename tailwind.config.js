const { colors: defaultColors } = require('tailwindcss/defaultTheme');

const colors = {
    ...defaultColors,
    ...{
        'custom-orange': {
            500: '#ff6516',
            700: '#D14E0C',
        },
    },
};

module.exports = {
    purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.tsx', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: colors,
        extend: {},
    },
    variants: {
        extend: {
            margin: ['last'],
        },
    },
    plugins: [],
};
