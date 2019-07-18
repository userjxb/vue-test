
const path = require('path');
module.exports = {
    publicPath: './',
    // 路径别名
    chainWebpack: config => {
        config.resolve.alias
            .set('pages', path.join(__dirname,'src/pages'))
            .set('assets', path.join(__dirname,'src/assets'))
            .set( 'components', path.join(__dirname,'src/components'))
            .set( 'libs', path.join(__dirname,'src/libs'))
            .set( 'router', path.join(__dirname,'src/router'))
            .set( 'store', path.join(__dirname,'src/store'))
            .set( 'utils', path.join(__dirname,'src/utils'))
    },
    // 反向代理配置
    devServer: {
        proxy: {
            // 具体分类数据
            '/novel': {
                target: 'http://read.xiaoshuo1-sm.com',
                changeOrigin: true
            }
        }
    }
}