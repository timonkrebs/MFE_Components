const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:4202/",
    uniqueName: "mdmfdraw",
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
          "./projects/mdmf-draw/src/app/draw/draw.module.ts",
      },
      shared: {
        "@angular/core": { singleton: true, eager: true },
        "@angular/common": { singleton: true, eager: true },
        "@angular/router": { singleton: true, eager: true },
        "@ngxs/store": { singleton: true, eager: true },
        "mdmf-shared": { singleton: true, eager: true },
      },
    }),
  ],
};
