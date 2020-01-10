module.exports = {
  //配置别名
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css', 'styl', 'scss'],
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}

