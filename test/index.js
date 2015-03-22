var test = require('tape')
var unignored = require(__dirname + '/../')
var exec = require('shelljs').exec
var expected = [
  'CHANGELOG.md',
  'LICENSE',
  'README.md',
  'bin/cli.js',
  'index.js',
  'package.json'
]

test('cli self-test', function (t) {
  var output = exec(__dirname + '/../bin/cli.js', {silent: true}).output
  var files = output.split('\n').filter(Boolean)

  t.deepEqual(files, expected)
  t.end()
})

test('programmatic self-test', function (t) {
  unignored(__dirname + '/../', function (err, files) {
    if (err) throw err

    t.deepEqual(files, expected)
    t.end()
  })
})
