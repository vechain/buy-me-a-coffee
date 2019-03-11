module.exports = {
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')

        svgRule.uses.clear()
        svgRule
            .use('svg-url-loader')
            .loader('svg-url-loader')
            .options({
                encoding: 'base64',
                noquotes: true
            })
    },
    pwa: {
        workboxOptions: {
            skipWaiting: true,
            clientsClaim: true
        }
    }
}