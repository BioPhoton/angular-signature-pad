'use strict'
console.log('BUILD SCRIPT')

const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const config = require('../config')

return new Promise((resolve, reject) => {
  console.log('path',path.join(config.libPath, 'dist'))
  exec('travis status --no-interactive', {cwd: path.join(config.libPath, 'dist')})
    .then((result) => {
      if(result.stdout === config.ci.validState) {
        resolve(result)
      } else {
        reject(result)
      }
      console.log('result.stdout: ', result.stdout)
      console.log('result.stderr: ', result.stderr)
    })
    .catch((error) => {
    console.log('error', error);
      reject(error)
    })
}).catch((err) => {console.log('err', err)})

/*
 # checks the status of the last build of the current repository
 # --no-interactive disables the interactive mode
 # source: https://github.com/travis-ci/travis.rb/blob/master/README.md
 $state = travis status --no-interactive
 echo $state
 if ( $state -ne "passed")
 {
 Write-Host "Invalid travis state $state. State should be passed"  -foregroundcolor "red"
 Exit
 }
 Write-Host "checked travis state" -foregroundcolor "green"
 */
