'use strict'

const rimraf = require('rimraf')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const config = require(path.join('..', '..', 'config'))
const utils = require(path.join(__base, 'chore', 'scripts', 'utils'))

module.exports = refresh

function refresh() {
return utils.deleteFile(path.join(__base, 'node_modules'))
  // pulls the latest version
  .then(() => {
    console.info('start git pull --rebase')
    return exec('git pull --rebase', {cwd: __base})
  })
  // installs the node dependencies
  .then(() => {
    console.info('start npm install')
    return exec('npm install', {cwd: __base})
  })
  .then(() => {
    console.info('end npm install')
  })
}
