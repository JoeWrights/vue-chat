const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}


module.exports = {
  // devServer: {
  //   host: '127.0.0.1',
  //   port: '8080',
  //   proxy: {
  //     '/api': {
  //       target: 'http://127.0.0.1:3006',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '/api',
  //       },
  //     },
  //   },
  // },
  // chainWebpack: config => {
  //   const svgRule = config.module.rule('svg');
  //   // clear all existing loaders.
  //   // if you don't do this, the loader below will be appended to
  //   // existing loaders of the rule.
  //   svgRule.uses.clear();
  //   // add replacement loader(s)
  //   svgRule
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: '[name]',
  //     });
  // },
  chainWebpack: config => {
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/svgs/')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]',
      });
  },
}
