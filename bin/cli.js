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

