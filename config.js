// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        index: path.resolve(__dirname, 'dist/index.html'),
        assetsRoot: path.resolve(__dirname, 'dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: process.env.NODE_ENV === 'production' ? '/adstatic/adv2/dist' : '/',
        productionSourceMap: true
    },
    dev: {
        port: 8112,
        proxyTable: { '/adv2': 'http://beta.ad.immomo.com:8181', '/ad': 'http://beta.ad.immomo.com:8181'}
    }

}
