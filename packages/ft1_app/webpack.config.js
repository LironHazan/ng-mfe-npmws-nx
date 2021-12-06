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
// sharedMappings.register(path.join(__dirname, './tsconfig.json'), [
//   workspaceRootPath,
// ]);

sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  '@nxe/shared/data-access',
]);

console.log(sharedMappings)

module.exports = {
  externals:{
    rxjs: 'rxjs',
    '@angular/common/http': 'ng.common.http',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@angular/compiler': 'ng.compiler',
    '@angular/animations': 'ng.animations',
    '@angular/forms': 'ng.forms',
    // Following cannot be excluded so keep in comment
    // '@angular/core': 'ng.core',
    // '@angular/common': 'ng.common',
    // '@angular/router': 'ng.router',
  },
  output: {
    uniqueName: "ft1_app",
    publicPath: "http://localhost:4201/",
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
  // experiments: {
  //   outputModule: true
  // },
  plugins: [
    new ModuleFederationPlugin({
      name: "ft1_app",
      // library: { type: "module" },
      filename: "remoteEntry.js",
      exposes: {
        './Module': './packages/ft1_app/src/app/remote-entry/entry.module.ts',
      },
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
