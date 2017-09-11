module.exports = {
  PROXY_TABLE: {
    // 解决开发环境的跨域问题
    '/talk': {
      target: 'http://59.110.62.241:9051',
      changeOrigin: true,
      pathRewrite: {
        '^/talk': '/talk'
      }
    }
  } 
}