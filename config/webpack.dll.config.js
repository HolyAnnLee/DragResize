const path = require('path');
const paths = require('./paths');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DllPlugin = require('webpack/lib/DllPlugin');
module.exports = {
 entry:{
    react: ['react', 'react-dom']
 },
 output:{
     filename: '[name].dll.js',
     path: paths.appDll,
     library: '_dll_[name]',  //dll的全局变量名
 },
 plugins:[
    new CleanWebpackPlugin(['*.js','*.json'], {
        root: paths.appDll
    }),
    new DllPlugin({
        context: __dirname,
        name: '_dll_[name]',  //dll的全局变量名
        path: path.resolve(paths.appDll,'[name].manifest.json'),//描述生成的manifest文件
    })
 ]
}