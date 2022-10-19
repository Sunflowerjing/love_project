const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次打包都把上次的打包文件删除

const { DEV, DEBUG } = process.env;
process.env.BABEL_ENV = DEV ? 'development' : 'production';
process.env.NODE_ENV = DEV ? 'development' : 'production';
console.log(DEV, '===', process.env)
module.exports = {
  mode: DEV ? 'development' : 'production',
  devtool: DEV && 'source-map',
  entry: './src/index.tsx', // 入口，开始打包的起点
  output: { // 打包文件的地址
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {// live server配置
    port: 8080
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // 使用loader的文件类型
        exclude: /node_modules/,
        loader: 'babel-loader', // 将要使用的loader
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(less|css)$/,
        exclude: /\.module\.less$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: !!DEV,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: !!DEV,
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: !!DEV,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !!DEV,
            },
          },
        ],
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'/src/index.html')
    }),
    new CleanWebpackPlugin(),
  ]
}
