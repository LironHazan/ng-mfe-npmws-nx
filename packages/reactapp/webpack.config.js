const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");


module.exports = options => {
  return {
    // entry: './index.js',
    output: {
      // filename: 'bundle.js',
      publicPath: "http://localhost:4204/",
      uniqueName: "reactapp"
    },
    // module: {
    //   rules: [
    //     {
    //       test: /.js$/,
    //       exclude: /node_modules/,
    //       use: [
    //         {
    //           loader: 'babel-loader',
    //           options: {
    //             cacheDirectory: true,
    //             presets: ['@babel/react', '@babel/env']
    //           }
    //         },
    //       ],
    //     },
    //   ],
    // },
    plugins: [
      new ModuleFederationPlugin({
          // For remotes (please adjust)
          name: "reactapp",
          library: { type: "var", name: "reactapp" },
          filename: "remoteEntry.js",
          exposes: {
              './app': './packages/reactapp/src/app/app.tsx', // Even the react app exposed to the wc
          },
          shared: ["react", "react-dom"]
        })
    ],
    devServer: {
      port: 4204
    }
  }
}
