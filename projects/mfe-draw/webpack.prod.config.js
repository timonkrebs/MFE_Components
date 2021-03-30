const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "https://flamboyant-bhaskara-04249f.netlify.app",
    uniqueName: "mfedraw",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mf-draw",
      library: { type: "var", name: "mfe_draw" },
      filename: "remoteEntry.js",
      exposes: {
        DrawModule:
          "./projects/mfe-draw/src/app/draw/draw.module.ts",
      },
      shared: {
        "@angular/core": { singleton: true, eager: true },
        "@angular/common": { singleton: true, eager: true },
        "@angular/router": { singleton: true, eager: true },
        "@ngxs/store": { singleton: true, eager: true },
        "mfe-shared": { singleton: true, eager: true },
      }
    })
  ],
};
