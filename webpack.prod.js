module.exports = {
  output: {
    filename: 'js/[name].[contenthash:8].js', // contenthash：只有模块的内容改变，才会改变hash值
  },
}