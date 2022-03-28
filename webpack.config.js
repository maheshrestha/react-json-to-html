const path = require("path");
const glob = require("glob");
const merge = require("webpack-merge");
const parts = require("./__webpack/webpack.parts");
const webpack = require("webpack");
const aliases = require("./__webpack/webpack.aliases");

const DEFAULT_ASSETS_URL = "/instances/5032/assets/autogenerated/";

const PATHS = {
  app: path.join(__dirname, "src"),
  build: path.resolve(__dirname, "autogenerated"),
  stylesDir: path.resolve(__dirname, "src", "stylesheets"),
  scriptsDir: path.resolve(__dirname, "src"),
  styles: glob.sync(__dirname, "src", "stylesheets", "/**/*"),
};

const commonConfig = merge([
  {
    entry: {
      mycsn: PATHS.scriptsDir + "index.js",
    },
    output: {
      path: PATHS.build,
      filename: "[name].js",
      publicPath: process.env.ASSETS_URL || DEFAULT_ASSETS_URL,
    },
    resolve: {
      alias: aliases,
      extensions: [".js", ".jsx"],
    },
  },
  parts.lintJavaScript({ include: PATHS.stylesDir }),

  parts.lintCSS({ include: PATHS.stylesDir }),

  parts.loadFonts({
    options: {
      name: "[name].[hash:8].[ext]",
    },
  }),

  parts.loadJavaScript({
    include: PATHS.scriptsDir,
    exclude: /node_modules/,
  }),

  parts.loadTemplateFiles({ include: PATHS.scriptsDir }),

  //parts.useExternalJQuery(),
  //parts.provideJQuery(),
  parts.optimizeLodash(),
]);

const developmentConfig = merge([
  {
    entry: {
      mycsn: [
        "webpack-dev-server/client?http://localhost:8080/",
        "webpack/hot/only-dev-server",
        PATHS.scriptsDir,
      ],
    },
    output: {
      devtoolModuleFilenameTemplate: "webpack:///[absolute-resource-path]",
    },
  },
  parts.loadCSS(),
  parts.generateSourceMaps({ type: "cheap-module-eval-source-map" }),
  parts.setFreeVariable("process.env.NODE_ENV", "development"),
  parts.namedModules(),
  parts.devServer(),
  parts.loadImages(),
]);

module.exports = (env) => {
  return merge(commonConfig, developmentConfig);
};
