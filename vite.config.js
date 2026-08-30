export default {
    server: {
        proxy: {
            '/stocks': 'http://localhost:3000',
        },
    },
    build: {
        outDir: './dist',
        emptyOutDir: true,
    },
};
