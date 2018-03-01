const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    context:__dirname,
    entry: {
        'index':'./src/app.js'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            title:'测试界面',
            template:'index.html',
            inject:'body'
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude: [
                    path.resolve(__dirname,"node_modules")
                ],
                options:{
                    presets:['env']
                }
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',options:{
                            importLoaders:1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('postcss-cssnext')()
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.less$/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('postcss-cssnext')()
                            ]
                        }
                    },{
                        loader: "less-loader", options: {
                            sourceMap: true,
                            strictMath: true,
                            noIeCompat: true
                        }
                    }
                ]
            }
        ]
    }
};