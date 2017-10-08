'use strict'

const util = require('util')
const path = require('path')
const exec = util.promisify(require('child_process').exec)

const utils = require(path.join('..', 'utils'))
const config = require(path.join('..', '..', 'config'))

// create version bump
let detectedBump
let detectedVersion

module.exports = versionBump

function versionBump () {

  return utils.getBump()
    .then((bump) => {
      detectedBump = bump
      return utils.getPackageVersion()
    })
    .then((version) => {
      detectedVersion = version
      return Promise.resolve()
    })
    // npm version detectedBump bumps the version specified in detectedBump and write the new data back to package.json
    .then(() => exec('npm --no-git-tag-version version ' + detectedBump))
    .then(() => exec('git add .\\package.json'))
    .then(() => exec('git commit -m "chore(release): ' + detectedVersion + ' (' + detectedBump + ' bump)"'))
    .then(() => exec('git tag ' + detectedVersion))
    // push the commit
    // --follow-tags also pushes the new tags
    // source: https://git-scm.com/docs/git-push
    .then(() => {
      return exec('git push-- follow-tags')
        .then(() => {
          console.log('pushed repo and created tag')
        })
    })

}
