const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:4202/",
    uniqueName: "mfedraw",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "draw",
      library: { type: "var", name: "draw" },
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
      },
    }),
  ],
};
