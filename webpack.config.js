var path = require("path");
var webpack = require("webpack");


module.exports = {
    cache: true,
    devtool: "source-map",
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, "static/build"),
        filename: "bundle.js",
        chunkFilename: "[chunkhash].js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    devServer: {
		contentBase: "./static",
        devtool: 'source-map',
        colors: true,
        progress: true,
        debug: true
    }
};
