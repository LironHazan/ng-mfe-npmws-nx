const { ModuleFederationPlugin } = require('webpack').container;
const resolve = require('path').resolve
const path = resolve('dist/packages/react-app')

module.exports = (config, context) => {
    config.context = process.cwd();
    config.optimization.runtimeChunk = false;
    config.plugins.push(
        new ModuleFederationPlugin({
            name: 'react_app',
            filename: 'remoteEntry.js',
            exposes: {
                './App': './packages/react-app/src/main.tsx',
            },
            shared: {
                react: { singleton: true },
                'react-dom': { singleton: true },
            },
        })
    );
    config.output = {
        path,
        uniqueName: 'react_app',
        publicPath: 'http://localhost:4204/',
        clean: true,
    }
    return config;
};
