var rimraf = require('rimraf')
var shell = require('shelljs')
var path = require('path')
var glob = require('glob')
var tmp = require('tmp')
var fs = require('fs')

module.exports = function (pathName, callback) {
  pathName = pathName || './'
  var pjson = require(path.resolve(process.cwd(), pathName, 'package.json'))
  var currentDir = path.basename(process.cwd())
  shell.cd(process.cwd())
  var tmpDir = tmp.dirSync({
    dir: '../',
    unsafeCleanup: true
  })
  shell.cd(tmpDir.name)
  fs.writeFileSync('package.json', '{"name": "unignored-tmp","version": "0.0.0"}')
  shell.exec('npm install ../' + currentDir, {silent: true})
  var folderName = 'node_modules/' + pjson.name + '/'
  glob(folderName + '**', {nodir: true}, function (err, files) {
    rimraf.sync(tmpDir.name)
    if (err) { callback(err) }
    files = files.map(function (file) {
      return file.replace(folderName, '')
    })
    callback(null, files)
  })
}
