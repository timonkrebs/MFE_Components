const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const DashboardPlugin = require("@module-federation/dashboard-plugin");

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
      name: "mf-draw",
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
    new DashboardPlugin({
      filename: "dashboard.json",
      dashboardURL: "http://localhost:3000/api/update",
      metadata: {
        source: {
          url:
            "https://github.com/timonkrebs/MFE_Components/tree/master/projects/mfe-draw",
        },
        remote: "http://localhost:4202/remoteEntry.js",
      },
    })
  ],
};
