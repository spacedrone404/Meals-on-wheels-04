// Last change: 2026.08.08


const path = require("path");
const PugPlugin = require("pug-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Forced reload webpack' upon error

// class RetryAfterErrorPlugin {
//   apply(compiler) {
//     let timeoutId;
//     compiler.hooks.done.tap("RetryAfterPlugin", (stats) => {
//       if (stats.hasErrors()) {
//         if (timeoutId) {
//           clearTimeout(timeoutId);
//         }
//         timeoutId = setTimeout(() => {
//           compiler.watching.invalidate();
//         }, 4000);
//       }
//     });
//   }
// }

module.exports = {
  entry: {
    index: "./src/index.pug",
    screen1: "./src/pages/screens/screen1.pug",
    screen2: "./src/pages/screens/screen2.pug",
    database: "./src/pages/database.pug",
    settings: "./src/pages/settings.pug",
    about: "./src/pages/about.pug",
  },

  output: {
    path: path.join(__dirname, "dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|mp4)$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("images", "[name].[contenthash][ext]"),
        },
      },
      {
        test: /\.(ico)$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("icons", "[name].[contenthash][ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
    ],
  },

  plugins: [
    new PugPlugin({
      pretty: true,
      js: {
        filename: "js/[name].[contenthash:8].js",
      },
      css: {
        filename: "css/[name].[contenthash:8].css",
      },
    }),
  ],

  devServer: {
    // watchFiles: path.join(__dirname, 'src'),
    // port: 9000,
    historyApiFallback: true,
    proxy: {
      "/": {
        target: "http://localhost",
        changeOrigin: true,
      },
    },
    static: {
      directory: path.join(__dirname, "dist"),
      serveIndex: true,
    },
    watchFiles: {
      paths: ["src/**/**/*.*"],
      options: {
        usePolling: true,
      },
    },
  },
};
