# Microfrontends Angular 11

This project shows an example of using Webpack 5 Module Federation with Angular `11.2.6` using shared module and NGXS state management.

- note the use of **yarn**, this is required to override the webpack version for the angular cli
- the project was developed based on the the example `angular11-microfrontends`

- shared library will maintain the application state.
- shell (host) and draw (remote) can access the store, dispatch actions etc.
  - the draw:
    - has a form to create an image, the image info is added stored in the application state (store) which is in the share module `mfe-shared`
    - show the list of images by selecting them from the common store
  - the shell:
    - show the list of images by selecting them from the common store
  - when an image is added to the store, both shell and draw can see the changes.

## Running the demo

- Install packages: `yarn install`
- start the dashboard: `start:dashboard` // Please follow instructions here to boot and run the dashboard: https://www.npmjs.com/package/@module-federation/dashboard-plugin
- Build the shared library `yarn build:shared`
- Start the mfe-shell: `yarn start:shell`
- Start the Microfrontend: `yarn start:draw`
- Open the shell http://localhost:4200
- Click the button to load the remote Microfrontend

## Usage

To enable use of Webpack 5 with the angular cli you **must** use **yarn** as your package manager, it allows you to override the webpack dependencies for the CLI.
The package.json contains the following section to override webpack to use version 5 instead of 4:

```json
  "resolutions": {
    "webpack": "5.4.0"
  },
```

## Project Structure

### Shell (mfe-shell)

The shell project located in: `projects/mfe-shell` folder, its contains the shell application which is used to load remote Microfrontends using dynamic routing constructed from the Microfrontend array. The list of Microfrontends can be loaded from a config if required, but for the example it is just an hardcoded array.

The share libraries and Angular library (`mfe-shared`) are configured within the Module Federation config:

```js
  plugins: [
    new ModuleFederationPlugin({
      shared: {
        "@angular/core": { eager: true, singleton: true },
        "@angular/common": { eager: true, singleton: true },
        "@angular/router": { eager: true, singleton: true },
        "@ngxs/store": {singleton: true, eager: true },
        "mfe-shared": { singleton: true, eager: true },
      },
    }),
  ],
```

The shared module (`mfeSharedModule`) in the `mfe-shared` should be imported as normal in the `@NgModule`

### Draw Microfrontend (mfe-draw)

The draw project located in: `projects/mfe-draw` contains a draw module with some child routes configured. The draw module is exposed as a remote module within the Module Federation config:

```js
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
];
```

### Shared library (mfe-shared)

- the shared library is a typical Angular library created by `ng generate library mfe-shared`

- it uses state management library `ngxs`

  - the dependencies installation
    ```bash
    yarn add @ngxs/store
    ## for loggin and browswer devtools
    yarn add --dev @ngxs/logger-plugin @ngxs/devtools-plugin
    ```
  - need to build the library first before running shell and draw projects
    ```bash
    ng build mfe-shared
    ```

- it contains the `actions`, application `state` and common `models`
