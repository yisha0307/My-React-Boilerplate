const path = require('path'); //import node
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'components');
const webpack = require('webpack');
const HtmlWebackPlugin = require('html-webpack-plugin');

const env = process.env.WEBPACK_ENV;
let outputFile;
let plugins = [
        new HtmlWebackPlugin({
            title: 'React Boilerplate by E-sha',
            template: path.resolve(__dirname, 'templates/index.ejs'),
            inject: 'body'
        })
    ];
if(env === 'build'){
        const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
        plugins.push(new UglifyJsPlugin({minimize: true}));
        outputFile = 'bundle.min.js';
    }else{
        outputFile = 'bundle.js';
    }

module.exports = {
    devtool: false,
    entry: __dirname + '/app/index.jsx',
//webpack的入口文件只有一个，所以写的所有components甚至包括css/json什么的，都要引用在这里
    output:{
        path: path.resolve(__dirname, 'dist'), //指定编译后的代码位置
        filename: outputFile
    },
//我这边是新建了一个folder叫public，用来放index.html和bundle.js
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    plugins: plugins,
    module: {
        loaders: [
           {
            test: /\.jsx$/,
            loader:'babel-loader',
            exclude: /node_modules/,
        }, {
            test: /\.js$/,
            loader:'babel-loader',
            exclude: /node_modules/
        },{
            test: /\.scss$/,
            //loader的执行是从右到左的
            loaders: ['style-loader', 'css-loader?modules','sass-loader'],
            include: path.resolve(__dirname, 'app')
        },{
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader?modules'],
        },{
            test: /\.(png|jpg|jpeg)$/,
            loader: 'file-loader'
        },{
            test: /\.json$/,
            loader: 'json-loader',
            exclude: /node_modules/
        }]
    },
    resolve:{
            extensions: ['.js', '.jsx']
    },
    // externals: {
    //     "jquery":"jQuery",
    //     "react":"React",
    //     "redux":"Redux",
    //     "react-dom" :"ReactDOM",
    //     "react-redux":"ReactRedux"
    //     "thunk":"ReduxThunk"
    // },
};