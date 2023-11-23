const path = require('path')

// 导入HTML插件，得到一个构造函数
const HtmlPlugin = require('html-webpack-plugin')
// 导入清除dist文件夹的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 通过template来复制一份index
const htmlplugin = new HtmlPlugin({
  template: './src/index.html', // 原文件的存放路径
  filename: './index.html', // 生成的文件的存放路径
})

module.exports = {
  // 打包的模式可选值：production development
  mode: 'development',
  entry: './src/index.ts',
  // 挂截webpack的插件
  plugins: [htmlplugin, new CleanWebpackPlugin()],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        // 使用 babel-loader 来处理高级 JS 语法,
        test: /\.js$/,
        use: 'babel-loader',
        // 注意需要排除掉 node-modules 和 vue 等第三方包。
        exclude: /node-modules|vue\S{0,}(.js$)/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      // @ 表示src这一层目录
      '@': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: '8080',
  },
}
