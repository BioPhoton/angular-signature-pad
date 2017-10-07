'use strict'
console.log('BUILD SCRIPT')

const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const config = require('../config')

exec('travis status --no-interactive', {cwd: path.join(config.libPath, 'dist')}, (error, stdout, stderr) => { console.log('travis status', error, stdout, stderr)})
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
