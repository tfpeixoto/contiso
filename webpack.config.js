const path = require('path')
const glob = require("glob")
const browserSyncPlugin = require('browser-sync-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")
const copyPlugin = require("copy-webpack-plugin")
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin")
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
var webpack = require("webpack")

THEME_NAME = 'contiso'
JS_DIR = path.resolve(__dirname, `wp-content/themes/${THEME_NAME}/src/js`)
CSS_DIR = path.resolve(__dirname, `wp-content/themes/${THEME_NAME}/src/css`)
THEME_DIR = path.resolve(__dirname, `wp-content/themes/${THEME_NAME}`)
BUILD_DIR = path.resolve(__dirname, `wp-content/themes/${THEME_NAME}/assets`)

const localServer = {
  host: 'localhost',
  port: 3000,
  proxy: `http://${THEME_NAME}.local/`
}

const config = {
  entry: {
    home: `${JS_DIR}/home.js`,
    page: `${JS_DIR}/page.js`,
  },

  output: {
    filename: 'js/[name].js',
    path: BUILD_DIR,
    clean: true
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new NodePolyfillPlugin(),

    new miniCssExtractPlugin({
      filename: 'css/[name].css',
    }),

    new PurgeCSSPlugin({
      paths: glob.sync(`${THEME_DIR}/**/*`, { nodir: true }),
      safelist: [],
    }),

    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 75
        }
      }],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),

    new browserSyncPlugin({
      host: localServer.path,
      port: localServer.port,
      proxy: localServer.proxy,
      files: [
        `${THEME_DIR}/**/*.php`,
        `${THEME_DIR}/assets/css/*.css`,
        `${THEME_DIR}/assets/js/*.js`,
      ],
    }),

    new webpack.SourceMapDevToolPlugin({}),

    new copyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `${THEME_DIR}/src`, 'images'),
          to: path.resolve(__dirname, `${THEME_DIR}/assets`, 'images')
        },
      ],
    }),
  ],

  devtool: false,

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: miniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer'
                ]
              }
            }
          },
          'sass-loader'
        ]
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },
    ]
  },

  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              // ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
}

module.exports = config;
