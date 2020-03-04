module.exports = {
    outputDir: 'admin',
    configureWebpack: {
        entry: {
            app: [
                __dirname + '/src/main.js'
            ]
        }
    }
};
