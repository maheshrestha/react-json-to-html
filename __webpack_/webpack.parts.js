const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const WriteFilePlugin = require('write-file-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const Jarvis = require('webpack-jarvis');

exports.createLoadingHTML = ({ template, dest }) => ({
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: dest,
      template,
      inject: false
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    indent: 'postcss',
    plugins: () => [require('autoprefixer')()]
  }
});

exports.lintJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader'
      }
    ]
  }
});

exports.lintCSS = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'postcss-loader',
        options: {
          plugins: () => [require('stylelint')()]
        }
      }
    ]
  }
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|gif)$/,
        include,
        exclude,

        use: ['cache-loader', { loader: 'url-loader', options }]
      }
    ]
  }
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
        include,
        exclude,

        use: [{ loader: 'file-loader', options }]
      }
    ]
  }
});

exports.loadJSON = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.json$/,
        include,
        exclude,
        loader: 'json-loader'
      }
    ]
  }
});

exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        exclude,

        loader: 'babel-loader',
        options: {
          // Enable caching for improved performance during
          // development.
          // It uses default OS directory by default. If you need
          // something more custom, pass a path to it.
          // I.e., { cacheDirectory: '<path>' }
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
});

exports.loadCSS = ({ include, exclude } = {}) => {
  const plugin = new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true
  });

  return {
    module: {
      rules: [
        {
          test: /\.s?css$/,
          include,
          exclude,

          use: ['css-hot-loader'].concat(
            plugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
          )
        }
      ]
    },
    plugins: [plugin]
  };
};

exports.extractCSS = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: '[name].[contenthash:8].css',
    allChunks: true
  });

  return {
    module: {
      rules: [
        {
          include,
          exclude,
          test: /\.s?css$/,

          use: plugin.extract({
            use,
            fallback: {
              loader: 'style-loader'
            }
          })
        }
      ]
    },
    plugins: [plugin]
  };
};

exports.generateSourceMaps = ({ type }) => ({
  devtool: type
});

exports.extractBundles = bundles => ({
  plugins: bundles.map(
    bundle => new webpack.optimize.CommonsChunkPlugin(bundle)
  )
});

exports.optimizeBundleSizes = () => ({
  plugins: [
    new webpack.optimize.AggressiveSplittingPlugin({
      minSize: 10000,
      maxSize: 30000
    })
  ]
});

exports.clean = filepath => ({
  plugins: [
    new CleanWebpackPlugin([filepath], {
      root: path.resolve(__dirname, '..')
    })
  ]
});

exports.copyStaticAssets = options => ({
  plugins: [new CopyWebpackPlugin(options), new WriteFilePlugin()]
});

exports.minifyJavaScript = () => ({
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: true,
      cache: true,
      uglifyOptions: {
        mangle: false,
        pure_funcs: ['console.log']
      }
    })
  ]
});

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false
    })
  ]
});

exports.devServer = () => ({
  output: {
    publicPath: 'http://localhost:8080/assets/autogenerated/'
  },
  devServer: {
    historyApiFallback: true,

    overlay: {
      errors: true,
      warnings: false
    },
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});

exports.loadTemplateFiles = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.template$/,
        include,
        exclude,
        loader: 'raw-loader'
      }
    ]
  }
});

exports.namedModules = () => ({
  plugins: [new webpack.NamedModulesPlugin()]
});

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [new webpack.DefinePlugin(env)]
  };
};

exports.useExternalJQuery = () => ({
  externals: {
    jquery: 'jQuery',
    $: 'jQuery'
  }
});

exports.provideJQuery = () => ({
  resolve: {
    alias: {
      jquery: 'jquery/src/jquery'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
});

exports.optimizeLodash = () => ({
  plugins: [
    new LodashModuleReplacementPlugin({
      'collections': true,
      'shorthands': true
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-au/)
  ]
});

exports.jarvis = () => ({
  plugins: [
    new Jarvis({
      port: 1337
    })
  ]
});
