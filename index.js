var shelljs = require('shelljs/global')
var path = require('path')
var glob = require('glob')
var fs = require('fs')

module.exports = function (pathName, callback) {
  pathName = pathName || './'
  var pjson = require(path.resolve(process.cwd(), pathName, 'package.json'))
  var currentDir = path.basename(process.cwd())
  cd(process.cwd())
  mkdir('-p', '../unignored-tmp')
  cd('../unignored-tmp')
  fs.writeFileSync('package.json', '{"name": "unignored-tmp","version": "0.0.0"}')
  exec('npm install ../' + currentDir, {silent: true})
  var folderName = 'node_modules/' + pjson.name + '/'
  glob(folderName + '**/*', function (err, files) {
    if (err) { callback(err) }
    rm('-rf', '../unignored-tmp')
    files = files.map(function(file) {
      return file.replace(folderName, '')
    })
    callback(null, files)
  })
}