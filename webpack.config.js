const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')
const path = require('path');
//process.env.NODE_ENV == 'production' ? 'production' : 'development';
module.exports = {
    mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',//默认是开发模块
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        hot: true,//热更新插件
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: {//browserHistory的时候，刷新会报404. 自动重定向到index.html
            index: './index.html'
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "~": path.resolve(__dirname, 'node_modules')
        },
        //当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找哪些扩展名
        extensions: ['.ts', '.tsx', '.js', '.json','.less']
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                loader: 'ts-loader',
                //babel-plugin-import 可以实现antd按需加载，所以它要和babel-loader配合使用
                //ts-loader
                options: {
                    transpileOnly: true,//只转译，不检查
                    getCustomTransformers: () => ({//获取或者说定义自定义的转换器
                        before: [tsImportPluginFactory({
                            "libraryName": 'antd',//对哪个模块进行按需加载
                            "libraryDirectory": "es",//按需加载的模块，如果实现按需加载，必须是ES Modules
                            "style": "css" //自动引入它对应的CSS
                        })]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: { importLoaders: 0 }
                }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    }],
            },
            {
                test: /\.less$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: { importLoaders: 0 }
                },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    'less-loader'
                ],
                // exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif|svg|jpeg)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //热更新插件
        new webpack.HotModuleReplacementPlugin()
    ]
}