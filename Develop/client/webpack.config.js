const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js' // Add the 'install.js' entry here
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
      // Generate a Web App Manifest file
      new WebpackPwaManifest({
        name: 'Your PWA Name',
        short_name: 'PWA',
        description: 'Your PWA description',
        background_color: '#ffffff',
        theme_color: '#3498db',
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Icon path
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('icons'), // Icon destination folder
          },
        ],
      }),

      // Inject a service worker using Workbox
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker script
        swDest: 'sw.js', // Output service worker file name
      }),
    ],

    module: {
      rules: [
        // Configure CSS loaders here if needed
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // Configure Babel loader here if needed
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };

