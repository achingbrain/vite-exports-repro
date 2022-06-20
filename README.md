# Vite and exports

This is a simple vite project that shows a problem with how exports maps are interpreted.

There is a [dependency](src/node_modules/mixed-dep) that declares no `"type"` field in it's `package.json` so should be treated as a commonjs module. It has an [exports](https://nodejs.org/api/packages.html#exports) map that declares commonjs and ESM versions of the module.  The module itself just exports a function that returns a string.

That module is imported by [src/index.js](src/index.js) directly, also via a [cjs dep](src/node_modules/cjs-dep) and an [esm dep](src/node_modules/esm-dep).

There is a small `vite.config.js` that just turns off minification to make examining the transpiled code simpler.

## Install

```console
$ git clone https://github.com/achingbrain/vite-exports-repro.git
$ cd vite-exports-repro
$ npm i
```

## Usage

Start the project in dev mode:

```console
$ npm start
```

Open http://localhost:8888/ - see the expected message:

```
cjs: hello from js
esm: hello from mjs
mixed: hello from mjs
```

Great!

Now build the project for production and start a http server:

```console
$ npm run production
```

Open http://127.0.0.1:8080/ and see... nothing.

Check the console for errors:

```
index.9509a74d.js:68 Uncaught (in promise) TypeError: cjsDep is not a function
    at main (index.9509a74d.js:68:10)
    at index.9509a74d.js:73:1
```

In production mode `cjsDep` is being incorrectly loaded as an ESM dep so has a `.default` property.
