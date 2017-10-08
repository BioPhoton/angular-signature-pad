const utils = require('./utils')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

// release on git and npm

// Make a new GitHub release from git metadata based on your commit-convention. In this case angular convention
// source: https://github.com/conventional-changelog/conventional-github-releaser/blob/master/README.md
return  utils.getPreset()
  .then((preset) => exec('conventional-github-releaser -p ' + preset))
