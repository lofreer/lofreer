var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports= {
	entry: {
		app: path.resolve(APP_PATH, 'index.js'),
		vendors: ['marked']
	},
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},
	//enable dev source map
	devtool: 'eval-source-map',
	//enable dev server
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	resolve: {
	    extensions: ['', '.js', '.jsx']
	},
	//babel重要的loader在这里
	module: {
		loaders: [{
            test: /\.jsx?$/,
	        loader: 'babel',
	        include: APP_PATH,
	        query: {
	          presets: ['es2015', 'react']
	        }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader','css-loader')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract( "style-loader", "css-loader!less-loader")
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192&name=./assets/images/[hash].[ext]'
        }]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({minimize: true}),
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		new ExtractTextPlugin("styles.css"),
		new HtmlwebpackPlugin({
	      title: 'L.F/肆叶 _Blog'
	    })
	]
}