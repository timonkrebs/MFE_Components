const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const DashboardPlugin = require("@module-federation/dashboard-plugin");
const WebpackBeforeBuildPlugin = require("before-build-webpack");

module.exports = {
  output: {
    publicPath: "https://flamboyant-bhaskara-04249f.netlify.app/",
    uniqueName: "draw",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new WebpackBeforeBuildPlugin(async function(_, callback) {
      console.log('delay build by 60s');
      await new Promise(r => setTimeout(r, 60000));
      callback();
    }),
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
    }),
    new DashboardPlugin({
      filename: "dashboard.json",
      publishVersion: "1.0.0",
      dashboardURL: "http://localhost:3000/api/update",
      metadata: {
        source: {
          url:
            "https://github.com/timonkrebs/MFE_Components/tree/master/projects/mfe-draw",
        },
        remote: "http://localhost:4202/remoteEntry.js",
      }
    })
  ],
};
