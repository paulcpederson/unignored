var rimraf = require('rimraf')
var shell = require('shelljs')
var path = require('path')
var glob = require('glob')
var tmp = require('tmp')
var fs = require('fs')

module.exports = function (pathName, callback) {
  pathName = pathName || './'
  var targetDir = path.resolve(process.cwd(), pathName)
  var pjson = require(path.resolve(targetDir, 'package.json'))
  var dirName = path.basename(process.cwd())
  shell.cd(targetDir)
  var tmpDir = tmp.dirSync({
    dir: '../',
    unsafeCleanup: true
  })
  shell.cd(tmpDir.name)
  fs.writeFileSync('package.json', '{"name": "unignored-tmp","version": "0.0.0"}')
  shell.exec('npm install ../' + dirName, {silent: true})
  var folderName = 'node_modules/' + pjson.name + '/'
  var globOptions = {
    nodir: true,
    ignore: folderName + 'node_modules/'
  }
  glob(folderName + '**', globOptions, function (err, files) {
    rimraf.sync(tmpDir.name)
    if (err) { callback(err) }
    files = files.map(function (file) {
      return file.replace(folderName, '')
    })
    callback(null, files)
  })
}
