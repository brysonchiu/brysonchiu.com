var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['css-hot-loader'].concat(ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: [
		{ loader: 'css-loader', options: {
			sourceMap: true,
			url: false
		}},
		{ loader: 'postcss-loader', options: {
			plugins: function () {
			  return [
			    require('precss'),
			    require('autoprefixer')
			  ];
		  	},
			sourceMap: true
    	}},
		{ loader: 'sass-loader', options: {
			sourceMap: true
		}}
    ]
}))
var cssProd = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: [
		{ loader: 'css-loader', options: {
			url: false
		}},
		{ loader: 'postcss-loader', options: {
			plugins: function () {
			  return [
			    require('precss'),
			    require('autoprefixer')
			  ];
			}
    	}},
		{ loader: 'sass-loader', }
    ],
	publicPath: '/dist/'
})
var cssConfig = isProd ? cssProd : cssDev;
var sourcemapConfig = isProd ? 'none' : 'inline-source-map';

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist/'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: cssConfig
			}
		]
	},
	devServer: {
		hotOnly: true,
		inline: true,
		open: true,
		openPage:'dist'
	},
	devtool: sourcemapConfig,
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			Rellax: 'rellax'
		}),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		})
	]
};
