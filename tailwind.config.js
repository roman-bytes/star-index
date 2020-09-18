module.exports = {
    theme: {
        extend: {
            colors: {
                starwarsYellow: '#FFE81F',
            },
            padding: {
                lg: '9rem',
            },
            opacity: {
                'image-bg': '.95',
            },
            backgroundImage: (theme) => ({
                'profile-background': "url('https://images.unsplash.com/photo-1588609889709-09a65ef625d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format')",
            }),
        },
    },
    variants: {},
    plugins: [],
    purge: {
        // Filenames to scan for classes
        content: [
            './src/**/*.html',
            './src/**/*.js',
            './src/**/*.jsx',
            './src/**/*.ts',
            './src/**/*.tsx',
        ],
        // PurgeCSS options
        options: {
            // Whitelist specific selectors by name
            // whitelist: [],
        },
    },
};
