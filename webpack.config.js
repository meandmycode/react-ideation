/* global __dirname */
import path from 'path';
import { DefinePlugin, NamedModulesPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import WebpackPwaManifest from 'webpack-pwa-manifest';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import BabiliPlugin from 'babili-webpack-plugin';
// import ServiceWorkerWebpackPlugin from 'serviceworker-webpack-plugin';

export default ({ production, coverage, outputPath, appConfig } = {}) => {

    const ASSET_NAME_TEMPLATE = '[name]-[hash:6].[ext]';

    const extractCss = new ExtractTextPlugin({
        filename: ASSET_NAME_TEMPLATE.replace('[ext]', 'css'),
    });

    const babelConfig = {
        compact: false,
        plugins: [],
    };

    // when running a coverage build we want to add the istanbul transform to add in instrumentation

    if (coverage) {
        babelConfig.plugins.push(['istanbul', { exclude: ['node_modules'] }]);
    }

    const rules = [
        {
            // js pipeline
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: babelConfig,
            },
        },
        {
            // css pipeline
            test: /\.css$/,
            use: extractCss.extract({
                use: [
                    'css-loader?modules&localIdentName=[hash:base64:5]',
                ],
            }),
        },
        {
            // other assets
            test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/,
            use: `file-loader?name=${ASSET_NAME_TEMPLATE}`,
        },
    ];

    // const pwaManifest = new WebpackPwaManifest({
    //     name: 'Ultra rare youtube app',
    //     short_name: 'PreactTube',
    //     description: 'The rarest of youtube apps',
    //     background_color: '#eee',
    //     theme_color: '#673ab8',
    //     display: 'standalone',
    //     start_url: '/',
    //     icons: [{
    //         src: path.resolve('meta/icon.png'),
    //         sizes: [96, 128, 192, 256, 384, 512],
    //     }],

    //     inject: false,
    // });

    const plugins = [

        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
            API_BASE_URI: JSON.stringify(appConfig.api),
        }),

        // pwaManifest,

        new HtmlWebpackPlugin({
            template: './index.ejs',
            filename: 'index.html',
            inject: false,
            minify: { collapseWhitespace: true, collapseBooleanAttributes: true },
            // manifest: pwaManifest.options,
        }),

        extractCss,

        // new ServiceWorkerWebpackPlugin({
        //     entry: './service-worker.js',
        // }),
    ];

    if (production) {
        plugins.push(
            new BabiliPlugin(),
            new OptimizeCssAssetsPlugin(),
        );
    } else {
        plugins.push(new NamedModulesPlugin());
    }

    return {
        context: path.resolve(__dirname, 'src'),

        entry: '.',

        module: {
            rules,
        },

        plugins,

        output: {
            publicPath: '/',
            path: outputPath ? path.resolve(outputPath) : undefined,
            filename: ASSET_NAME_TEMPLATE.replace('[ext]', 'js'),
            chunkFilename: '[name]-[chunkhash].js',
        },

        resolve: {
            modules: ['node_modules'],
        },

        devtool: 'source-map',
    };
};
