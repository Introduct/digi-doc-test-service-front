module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '^/api': {
        target: 'http://54.93.199.234:42351',
        changeOrigin: true,
      },
    },
  },
}
