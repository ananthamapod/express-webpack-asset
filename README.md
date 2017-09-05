express-webpack-asset
===============

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Middleware to load hashed webpack assets, in combination with https://github.com/kossnocorp/assets-webpack-plugin

## Configuration

Example webpack config:

```javascript
var SaveHashes = require('assets-webpack-plugin');

plugins: [
  new SaveHashes({path: path.join(__dirname, 'config')})
],
entry: './main.js',

output: {
  path: path.join(__dirname, '.tmp', 'public', 'app'),
  filename: "bundle-[name]-[hash].js",
  publicPath: "/app/"
},
```

Express config:

```javascript
var webpackAssets = require('express-webpack-assets');
app.use(webpackAssets('./config/webpack-assets.json', {
	devMode: true/false
}));
```

Express-webpack-asset can also support you with multiple json files. For that case you need to pass a path of your assets json files, example of usage:
```javascript
var webpackAssets = require('express-webpack-assets');
app.use(webpackAssets('./config', {
	devMode: true/false
}));
```
Please bear in mind that when using multiple files, each successive manifest will overwrite any properties that have matching names. The manifests are linked in alphabetical order by manifest name.

## Options

```javascript
{
	devMode: boolean // Enables development mode which disables caching of the manifest, which is useful when the manifest changes rapidly
}
```


## Usage

Example webpack-assets.json (taken from the README in the assets-webpack-plugin project):

```json
{
    "one": {
        "js": "/js/one_2bb80372ebe8047a68d4.bundle.js"
    },
    "two": {
        "js": "/js/two_2bb80372ebe8047a68d4.bundle.js"
    }
}
```

Express EJS view snippet:

```html
<script src="<%= webpack_asset('one', 'js') %>"></script>

```


