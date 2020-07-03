module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '^/api': {
        target: 'https://18.156.149.72/',
        changeOrigin: true,
      },
    },
  },
}
