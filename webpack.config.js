const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
	entry: './src/index.ts', // Entry point of your application
	output: {
		filename: '[name].bundle.js', // Output bundle name
		path: path.resolve(__dirname, 'dist'), // Output directory
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.js$/, // Apply this rule to .js files
				exclude: /node_modules/, // Skip node_modules directory
			},
		],
	},
	devServer: {
		historyApiFallback: true,
	},
	resolve: {
		extensions: ['.js', '.ts'],
		alias: {},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: 'assets', to: 'assets' }],
		}),
	],
};

module.exports = async (env, argv) => {
	if (argv.mode === 'development') {
		config.devtool = 'source-map';
	} else {
		config.devtool = false;
	}

	if (env.showBundle) {
		const BundleAnalyzerPlugin = await require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
		config.plugins.push(new BundleAnalyzerPlugin());
	}

	return config;
};
