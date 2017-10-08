'use strict'

const util = require('util')
const path = require('path')
const exec = util.promisify(require('child_process').exec)

const utils = require('../utils')
const config = require('../../config')

let detectedPreset
let detectedBump
let detectedVersion

module.exports = changelog

function changelog () {
// create changelog

// backup the src/package.json file
// we copy it to have the initial state saved.
// we bump the version update the changelog
// after doing this we use the real package.json and do another version bump
// there to have change log and version bump in separate commits
  return utils.backupPackageJson()
  // ensures that the right convention was detected
    .then(() => utils.getPreset())
    .then((preset) => {
      detectedPreset = preset
      return (detectedPreset === config.validPreset) ? Promise.resolve(detectedPreset) : Promise.reject(detectedPreset)
    })
    // ensures that a bump type was detected
    .then(() => utils.getBump())
    .then((bump) => {
      detectedBump = bump
      console.info('detectedBump', detectedBump)
      return (detectedBump) ? Promise.resolve(detectedBump) : Promise.reject(detectedBump)
    })
    // npm version detectedBump bumps the version specified in detectedBump and write the new data back to package.json
    // If you run npm version in a git repo, it will also create a version commit and tag.
    // This behavior is disabled by --no-git-tag-version
    // the var detectedBump specifies the segment of the version code to bump
    .then((bump) => {
      console.info('bump version without git', detectedBump)
      return exec('npm --no-git-tag-version version ' + detectedBump, {cwd: path.join(config.libPath, 'src')})
    })
    // conventional-changelog creates a chagnelog markdown from commits
    // -i Read the CHANGELOG from this file
    // CHANGELOG.md it the name of the file to read from
    // -s Outputting to the infile so you don't need to specify the same file as outfile
    // -p Name of the preset you want to use. In this case it is angular that is stored in $preset
    .then(() => exec('conventional-changelog -i CHANGELOG.md -s -p ' + detectedPreset, {cwd: __base}))
    // add CHANGELOG.md to the commit
    .then(() => exec('git add CHANGELOG.md', {cwd: __base}))
    // get the version number of package.json
    .then(() => {
      const packageJson = require(path.join(config.libPath, 'package.json'))
      detectedVersion = packageJson.version
    })
    // commit with comment
    .then(() => exec('git commit -m"docs(CHANGELOG): "' + detectedVersion, {cwd: __base}))
    // run build again because we want to have the new version in the dist folder
    .then(() => exec('npm run build:package', {cwd: __base}))
    // Replace the already bumped package.json with the _package.json initial copy
    .then(() => {
      return utils.restorePackageJson().then(() => {
        console.info('created changelog done')
      })
    })
}
