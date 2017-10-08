'use strict'

const rimraf = require('rimraf')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const config = require(path.join('..', '..', 'config'))
const utils = require(path.join(__base, 'chore', 'scripts', 'utils'))

process.env.DEBUG = config.debugMode

return new Promise((resolve, reject) => {
  rimraf(path.join(__base, 'node_modules'), function (err) {
    if (err) {
      console.error('remove files error: ', err)
      reject(err)
    }
    console.info('remove files done')
    resolve()
  })
})
  .then(() => {
    console.info('start git pull --rebase')
    return exec('git pull --rebase', {cwd: __base})
  })
  .then(() => {
    console.info('start npm install')
    return exec('npm install', {cwd: __base})
  })
  .then(() => {
    console.info('end npm install')
  })

