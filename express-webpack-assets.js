var fs = require('fs')
var path = require('path')

module.exports = function (manifestPath, options) {
  var manifest
  var isManifestLoaded = false

  options = options || {
    devMode: false
  }

  function loadManifest () {
    try {
      var data = {};

      if (fs.statSync(manifestPath).isDirectory()) {
        var manifestFiles = fs.readdirSync(manifestPath).sort();
        if (manifestFiles.length === 0) {
          console.error('there are no asset manifests', e)
        }
        data = manifestFiles.reduce(function (fullManifest, manifest) {
          return Object.assign(fullManifest, JSON.parse(fs.readFileSync(path.resolve(manifestPath, manifest), 'utf8')));
        });
      } else {
        data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
      }

      isManifestLoaded = true
      return data
    } catch(e) {
      console.log('could not load asset manifest', e)
    }
  }

  function getAsset (path, assetType) {
    if (options.devMode || !isManifestLoaded) {
      manifest = loadManifest()
    }

    if (manifest) {
      if (typeof manifest[path] === 'object') {
        if (assetType) {
          return manifest[path][assetType]
        } else {
          throw new Exception('Asset type not specified, could not resolve asset ' + path)
        }
      } else {
        return manifest[path]
      }
    } else {
      return path
    }
  }

  return function (req, res, next) {
    res.locals.webpack_asset = getAsset
    next()
  }

}
