var path = require("path");
var webpack = require("webpack");


module.exports = {
	cache: true,
	entry: './src',
	output: {
		path: path.join(__dirname, "build"),
		filename: "[name].js",
		chunkFilename: "[chunkhash].js"
	},
	module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
      ]
    }
};