const   webpack             = require('webpack'),
        HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + '/front',
    entry: {
        home: "./js/home"
    },
    output: {
        path: __dirname + '/prod',
        filename: "./js/[name].js",
        publicPath: '/'
    },

    module: {
        loaders: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: 'es2015'
                        }
                    },
                   
                },
                {
                    test: /\.css$/,
                    use: ['style-loader','css-loader','csso-loader','postcss-loader']
                },

                { 
                    test: /\.(woff|eot|ttf)$/,
                    loader: 'file-loader?name=./fonts/[name].[ext]'
                },
                { 
                    test: /\.(png|jpe?g)$/,
                    loader: 'file-loader?name=./img/[name].[ext]'
                }
            ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: () => {
                    return [
                        require('postcss-import')(),
                        require('postcss-cssnext')({
                            browsers: ['last 4 versions', '> 2%']
                        }),
                        require('postcss-assets')({
                            basePath: 'front/',
                            loadPaths: [
                                'img/icon/'
                            ],
                            relative: true
                        })
                    ];
                }
            }
        })
    ],
    
    devServer: {
        inline:true,
        hot:true
    } 
}
