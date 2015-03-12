var tmp = require('tmp');

module.exports = function (path, callback) {
  var tmpobj = tmp.dirSync()
  //console.log('Dir: ', tmpobj.name)
  var files = [
    'thisfile.js',
    'thatfile.js'
  ]
  callback(null, files)
}