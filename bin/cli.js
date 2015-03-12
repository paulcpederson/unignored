#!/usr/bin/env node
var unignored = require('../')
var yargs = require('yargs')
  .usage('Usage: $0 [options]')
  .options({
    'p': {
      alias: 'path',
      type: 'string',
      default: './',
      describe: 'path to module (relative)'
    }
  })
  .help('h')
  .alias('h', 'help')
  .version(require(__dirname + '/../package.json').version + '\n', 'v')
  .alias('v', 'version')

var argv = yargs.argv

unignored(argv.path, function (err, files) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  files.forEach(function (file) {
    console.log(file)
  })
  process.exit(0)
})
