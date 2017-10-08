'use strict'

const rimraf = require('rimraf')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const config = require(path.join('..','..', 'config'))

const utils = require(path.join(__base, 'chore', 'scripts', 'utils'))

process.env.DEBUG = config.debugMode

return exec('git pull --rebase', {cwd: __base})
;

/*new Promise((resolve, reject) => {
  rimraf(path.join(__base, 'coverage'), function (err) {
    if (err) {
      reject(err)
    }
    console.log('remove files done')
    resolve()
  })
})
  .then(() => */exec('git pull --rebase', {cwd: __base})//)
  .then(() => {
    console.log('start npm install');
    return exec('npm install', {cwd: __base})
  })
  .then(() => {
    console.log('end npm install');
  })
