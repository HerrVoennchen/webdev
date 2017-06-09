var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WatchLiveReloadPlugin = require('webpack-watch-livereload-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var NameAllModulesPlugin = require('name-all-modules-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: {
    app: ['./src/app.js'],
    vendor: ['bootstrap', 'angular', 'angular-route', 'jquery']
  },
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: debug ? '[name].[hash].js' : '[name].[chunkhash].js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.css', '.html', '.scss', '.json'],
    alias: {
      //config: path.resolve(__dirname, 'app/config.js')
    }
  },
  externals: {
    //config: 'config'
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            'env',
            'latest',
            ['es2015', {
              loose: true,
              modules: false
            }],
            'stage-3'
          ],
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties'
          ]
        },
        include: [path.resolve(__dirname, 'src')],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: debug
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: debug,
                plugins: [require('autoprefixer')()]
              }
            }
          ]
        })
      },
      {
        test: /\.html?$/,
        loader: 'html-loader'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?name=[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: debug ? [
    new ExtractTextPlugin({
      filename: 'app.bundle.css',
      allChunks: true
    }),
    new WatchLiveReloadPlugin({
      files: ['./src/**/*.html', './src/**/*.css']
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.modules
        .map(m => path.relative(m.context, m.request))
        .join('_');
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new NameAllModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      xhtml: true
    }),
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    })
  ] : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.modules
        .map(m => path.relative(m.context, m.request))
        .join('_');
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new NameAllModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      xhtml: true
    }),
    new ExtractTextPlugin({
      filename: 'app.bundle.css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {
        warnings: false
      },
      minimize: true,
      sourcemap: false
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        },
        colormin: true,
        discardDuplicates: true,
        discardOverridden: true,
        mergeLonghand: true,
        minifyFontValues: true,
        orderedValues: true,
        reduceDisplayValues: true,
        reduceInitial: true,
        uniqueSelectors: true,
        discardUnused: true,
        minifyGradients: true,
        minifySelectors: true,
        svgo: true
      },
      canPrint: true
    }),
    new WebpackShellPlugin({
      onBuildEnd: 'node copyFilesToDist.js'
    })
  ],
  devServer: {
    contentBase: 'src',
    //historyApiFallback: true,
    proxy: [{
      context: '/osrest/api',
      target: 'http://10.10.6.161',
      secure: false
    }]
  }
};
