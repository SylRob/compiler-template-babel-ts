const webpack = require('webpack');
const path = require('path');
const DashboardPlugin = require("webpack-dashboard/plugin");

const VERSION = process.env.npm_package_version;
const CACHE = 'v'+VERSION;
const ENV_TYPE = {
	'DEV': 'development',
	'TST': 'test',
	'STG': 'stage',
	'PRO': 'production'
};
const ENV = process.env.ENV_TYPE;
const buildPath = './dist';
const plugins = [];

/**
 * Set environment settings
 */
 var mode = '';
 var devServ = {};
switch (process.env.ENV_TYPE) {
	case ENV_TYPE.DEV:
		mode = 'development';
		devServ = {
			hot: true,
			port: 3001,
			contentBase: path.resolve(__dirname, 'dist'),
			inline: true,
			compress: true,
			historyApiFallback: true
		};
	break;
	case ENV_TYPE.TST:
	break;
	case ENV_TYPE.STG:
	break;
	case ENV_TYPE.PRO:
		mode = 'production';
	break;
}

/**
 * Set plugins
 */
if (ENV != ENV_TYPE.DEV) {

	//minify
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	);

//copyright
plugins.push(
	new webpack.BannerPlugin({banner: ''+
		'/**\n'+
		'* Copyright (C) 2017 ROBERT Sylvain\n'+
		'*\n'+
		'* @license Permission to use, copy, modify, and/or distribute this software for any\n'+
		'* purpose with or without fee is hereby granted, provided that the above\n'+
		'* copyright notice and this permission notice appear in all copies.\n'+
		'*\n'+
		'* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES\n'+
		'* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF\n'+
		'* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR\n'+
		'* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES\n'+
		'* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION\n'+
		'* OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN\n'+
		'* CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.\n'+
		'*/\n',
		raw: true, entryOnly: true})
)

} //if (ENV != ENV_TYPE.DEV)
else {
	plugins.push(
		new webpack.NamedModulesPlugin()
	)

	plugins.push(
		new webpack.HotModuleReplacementPlugin()
	)
	plugins.push(
		new DashboardPlugin()
	)

}

module.exports = {
	mode: mode,
	entry: ['./src/'],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: 'js/bundle.min.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.ts'],
	},
	devtool: ENV != ENV_TYPE.DEV ? '' : 'eval-source-map',
	module: {
		rules: [
			test: /\.ts$/,
			loaders: ['babel-loader', 'ts-loader'],
			query: {
				presets: ['env']
			},
			exclude: /node_modules/
		]
	},
	plugins: plugins
};



console.log('============================================================');
console.log(process.env.npm_package_name);
console.log(process.env.npm_package_description);
console.log('============================================================');
console.log('Version: '+process.env.npm_package_version);
console.log('Environment: '+process.env.ENV_TYPE);
console.log('Running: '+process.env.npm_lifecycle_event);
console.log('Build type: '+process.env.BUILD_TYPE);
console.log('Cache clean: '+CACHE);
console.log('============================================================');
