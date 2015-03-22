# Unignored

> **NOTICE: THIS MODULE HAS BEEN DEPRECATED. PLEASE USE [Irish Pub](https://github.com/thlorenz/irish-pub) or [pkgfiles](https://github.com/timoxley/pkgfiles) AS THEY WORK FOR *UNPUBLISHED* MODULES AS WELL.**

[![](https://img.shields.io/npm/v/unignored.svg?style=flat-square)](https://www.npmjs.com/package/unignored)
[![](https://img.shields.io/travis/paulcpederson/unignored.svg?style=flat-square)](https://travis-ci.org/paulcpederson/unignored)

> Check what files in an npm project will be published

## Install

```
npm install unignored
```

## Use

```
var unignored = require('unignored')
unignored('./', function(err, files) {
  console.log(files)
})
```

Simply require `unignored` and pass it a path to the npm project you'd like to check. Files will be an array of file paths (relative to the path you passed in) that will be included when you run `npm publish`.

## CLI

You can install the module globally and use it as a cli as well:

```
Usage: unignored [options]

Options:
  -p, --path     path to module (relative)    [default: "./"]
  -h, --help     Show help
  -v, --version  Show version number
```

## Why

NPM is very smart about which files are included and which are ignored by default. This is highly configurable with `.gitignore`, `.npmignore`, and the `files` key in `package.json`. Because these rules are slightly complex, it can be helpful to see what files *all consumers* of your module will have to download when they install it.

## About NPM Ignore

[This section](https://github.com/npm/npm/blob/448efd0eaa6f97af0889bf47efc543a1ea2f8d7e/doc/misc/npm-developers.md#keeping-files-out-of-your-package) of the manual explains this in pretty good detail.

Essentially, if there is no `.npmignore`,  the `.gitignore` will be used. That means anything that you are ignoring from source control won't be part of your module when people npm install it.

If there is a `files` field in `package.json`, then that will dictate what files are included in the version.

If you have both `files` and `.npmignore` and they conflict, `.npmignore` will override the file and it will still be ignored.

## Contribute

Contributions are welcome! This project uses the [standard style](https://github.com/feross/standard), so you should use it too! `npm test` will automatically make sure the code is written to the standard. If the tests pass, you are good to go!
