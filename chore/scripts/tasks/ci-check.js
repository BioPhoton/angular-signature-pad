'use strict'

const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const config = require(path.join('..', '..', 'config'))

// checks the status of the last build of the current repository
// --no-interactive disables the interactive mode
// source: https://github.com/travis-ci/travis.rb/blob/master/README.md
return exec('travis status --no-interactive', {cwd: path.join(config.libPath, 'dist')})
  .then((result) => {
    if (result.stdout === config.ci.validState) {
      resolve(result)
    } else {
      reject(result)
    }
    console.log('result.stdout: ', result.stdout)
    console.log('result.stderr: ', result.stderr)
  })
  .catch((error) => {
    console.log('error', error)
    reject(error)
  })
