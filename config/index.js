'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

const url = 'http://55550.16:8001' //假的
const fastFileUrl = 'http://17234:80' 

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/clinic_wechat': {
            target: url + '/clinic_wechat',
            changeOrigin: true,
            ws:false,
            pathRewrite: {
                '^/clinic_wechat': ''
            }
        },
        '/M00': {
            target:fastFileUrl, // 接口域名
            changeOrigin: true, //是否跨域
            ws:false,
        },
         '/api-manager': {  
            target: url + '/api-manager',
            changeOrigin: true,
            ws:false,
            pathRewrite: {
                '^/api-manager': ''
            }
        },
        '/api-patient': {    //将www.exaple.com印射为/apis
            target:url+'/api-patient',
        
            changeOrigin: true,     // 是否跨域
            pathRewrite: {
              '^/api-patient': ''   // 需要rewrite的,
            }
        },
        '/api-doctor': {    
            target:url+'/api-doctor', 
            changeOrigin: true,
            pathRewrite: {
                '^/api-doctor': ''
            }
        },
        '/clinic_user': {
            target:url + '/clinic_user',  // 接口域名
            changeOrigin: true,           // 是否跨域
            ws:false,                     // 如果要代理 websockets，配置这个参数
            pathRewrite: {
                '^/clinic_user': ''       // 需要rewrite的,
            }
        },
        '/clinic_file': {
            target:url + '/clinic_file',  // 接口域名
            changeOrigin: true,           // 是否跨域
            ws:false,
            pathRewrite: {
                '^/clinic_file': ''       // 需要rewrite的,
            }
        }
    },
    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
