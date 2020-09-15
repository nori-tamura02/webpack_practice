const path = require('path');
const MiniCssExtractPligin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/javascripts/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './javascripts/main.js',
    },
    module: {
        rules: [
            {
              test: /\.(ts|tsx)/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'ts-loader',
                },
              ],
            },
            {
              test: /\.js/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', {'targets':'> 0.25%, not dead'}],
                    ],
                  },
                },
              ],
            },
            {
                test: /\.(css|sass|scss)/,
                use: [
                    {
                      loader: MiniCssExtractPligin.loader,
                    },
                    {
                      loader: 'css-loader',
                      options: {
                        sourceMap: false,
                      },
                    },
                    {
                      loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'images/[name].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                    },
                ],
            },
            {
                test:/\.pug/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPligin({
            filename: './stylesheets/main.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/index.pug',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/access.pug',
            filename: 'access.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/members/taro.pug',
            filename: 'members/taro.html',
        }),
        new CleanWebpackPlugin(),
    ],
}
