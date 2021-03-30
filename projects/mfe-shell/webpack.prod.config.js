const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "https://naughty-mayer-ac23a9.netlify.app",
    uniqueName: "mfeshell",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mf-shell",
      library: { type: "var", name: "mfe_shell" },
      remotes: {
        "mf-draw": "mf-draw"
      },
      shared: {
        "@angular/core": { eager: true, singleton: true },
        "@angular/common": { eager: true, singleton: true },
        "@angular/router": { eager: true, singleton: true },
        "@ngxs/store": { singleton: true, eager: true },
        "mfe-shared": { singleton: true, eager: true },
      },
    })
  ],
};
