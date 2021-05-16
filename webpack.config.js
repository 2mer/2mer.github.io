const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'development',

	entry: './src/index.tsx',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 8080,
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html'
		})
	]
};