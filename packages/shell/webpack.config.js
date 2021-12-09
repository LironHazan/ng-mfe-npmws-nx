const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");


/**
* We use the NX_TSCONFIG_PATH environment variable when using the @nrwl/angular:webpack-browser
* builder as it will generate a temporary tsconfig file which contains any required remappings of
* shared libraries.
* A remapping will occur when a library is buildable, as webpack needs to know the location of the
* built files for the buildable library.
* This NX_TSCONFIG_PATH environment variable is set by the @nrwl/angular:webpack-browser and it contains
* the location of the generated temporary tsconfig file.
*/
//const tsConfigPath = process.env.NX_TSCONFIG_PATH ?? path.join(__dirname, '../../tsconfig.base.json');

const workspaceRootPath = path.join(__dirname, '../../');
const sharedMappings = new mf.SharedMappings();
console.log(sharedMappings)
// sharedMappings.register(path.join(__dirname, './tsconfig.json'), [
//   workspaceRootPath,
// ]);

sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  '@nxe/shared/data-access',
  '@nxe/shared/simple-event-emitter',
]);

module.exports = {
  output: {
    uniqueName: "shell",
    publicPath: "http://localhost:4200/",
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false,
    minimize: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
    		"ft1_app": 'ft1_app@http://localhost:4201/remoteEntry.js',
    		"react_app": 'react_app@http://localhost:4204/remoteEntry.js',
      },
      // library: { type: 'window', name: 'shell' },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/common/http": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true },
        // '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        // 'rxjs': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        // 'rxjs/operators': { singleton: true, strictVersion: true, requiredVersion: '~6.6.0' },
        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
