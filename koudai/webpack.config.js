var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports= {
	devtool: 'eval-source-map',
	entry: {
		index: ['./src/index']
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].js',
		publicPath: '/dist/'
	},
	devServer: {
		noInfo: true,
        inline: true,
        host: '0.0.0.0',
        port: 9999
	},
	resolve: {
		alias: {
            'components': path.resolve('./src/js/components'),
			'containers': path.resolve('./src/js/containers')
        },
	    extensions: ['', '.js']
	},
	module: {
		loaders: [{
            test: /\.js$/,
	        loader: ['babel'],
			exclude: /node_modules/,
	        include: __dirname,
	        query: {
	          presets: ['es2015']
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
            loader: 'url?limit=8192'
        }]
	},
	plugins: [
		new ExtractTextPlugin("style.css")
	]
}