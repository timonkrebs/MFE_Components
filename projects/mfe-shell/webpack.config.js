const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const DashboardPlugin = require("@module-federation/dashboard-plugin");

module.exports = {
  output: {
    publicPath: "http://localhost:4200/",
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
    }),
    new DashboardPlugin({
      filename: "dashboard.json",
      publishVersion: "1.0.0",
      dashboardURL: "http://localhost:3000/api/update",
      metadata: {
        source: {
          url:
            "https://github.com/timonkrebs/MFE_Components/tree/master/projects/mfe-shell",
        },
        remote: "http://localhost:4200/remoteEntry.js",
      },
    })
  ],
};
