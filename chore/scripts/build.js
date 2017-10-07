'use strict'

const config = require('../config')

const fs = require('fs')
const path = require('path')
const util = require('util')
const copyfiles = require('copyfiles')
const exec = util.promisify(require('child_process').exec)

// config
const ngPackagr = require(path.join(__base,'node_modules/ng-packagr/lib/ng-packagr'))

process.env.DEBUG = config.debugMode

const buildProcess = Promise.resolve()
  .then(res => {
    return packaging()
  })
  .then((r) => {
    return copyStyles()
  })
  .catch((e) => {
    console.log('e: ', e);
  })

// build scripts
// =============================================================================

async function packaging () {
  await ngPackagr.ngPackage({project: path.join(config.libPath, 'ng-package.json')})
    .then((res) => {
      console.log('done packaging')
    })
    .catch((err) => {
      console.error('Build failed.', err)
      process.exit(1)
    })
  const {stdout, stderr} = await exec('npm pack', {cwd: path.join(config.libPath, 'dist')}, (error, stdout, stderr) => { console.log('done npm pack')})
  return {stdout, stderr}
}

function copyStyles() {
  const source = path.join(config.libPath, 'src', 'styles.scss')
  const target = path.join(config.libPath, 'dist', 'styles.scss')

  return new Promise(
    function(resolve, reject) {
      copyfiles([source, target], {up:1}, (err) => {
        console.log('copy done');
        err ? reject(err) : resolve([source, target]);
      })
    });
}


