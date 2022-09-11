const fs = require('fs');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dirContents = fs.readdirSync('./');
const htmlFiles = [
    ...dirContents.filter(file => file.endsWith('.html'))
];

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'index.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name]-[hash][ext]'
                }
            }
        ]
    },
    plugins: [
        ...htmlFiles.map(htmlFile => 
            new HtmlWebpackPlugin({ 
                template: htmlFile,
                filename: htmlFile,
                inject: false
            })
        )
    ]
}