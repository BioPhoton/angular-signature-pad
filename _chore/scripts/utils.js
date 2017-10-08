'use strict'

const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const config = require('../config')
const utils = {}

utils.deleteFile = deleteFile
utils.copyFile = copyFile
utils.copyFilePromise = copyFilePromise
utils.copyMultiFilePromise = copyMultiFilePromise
utils.backupPackageJson = backupPackageJson
utils.restorePackageJson = restorePackageJson
utils.getPreset = getPreset
utils.getBump = getBump
utils.getPackageVersion = getPackageVersion

module.exports = utils

function deleteFile(source) {
  console.info('start deleting ', source)
  return new Promise((resolve, reject) => {
    // trash node_modules
    rimraf(source, function (err) {
      if (err) {
        console.error('remove files error: ', err)
        reject(err)
      }
      console.info('remove files done')
      resolve()
    })
  })

}
function copyFile (source, target, cb) {

  cb = cb || function () {
    }

  return new Promise((resolve, reject) => {
    console.info('copyFile', source, target)

    let ensureDirectoryExistence = function (filePath) {
      let dirname = path.dirname(filePath)
      if (fs.existsSync(dirname)) {
        return true
      }
      ensureDirectoryExistence(dirname)
      fs.mkdirSync(dirname)
    }
    ensureDirectoryExistence(target)

    let rd = fs.createReadStream(source)
    rd.on('error', function (err) {
      reject(err)
    })
    let wr = fs.createWriteStream(target)
    wr.on('error', function (err) {
      reject(err)
    })
    wr.on('close', function (ex) {
      resolve()
    })
    rd.pipe(wr)

  })
}

function copyFilePromise (source, target) {
  return new Promise(function (accept, reject) {
    copyFile(source, target, function (data) {
      if (data === undefined) {
        accept()
      } else {
        reject(data)
      }
    })
  })
}

function copyMultiFilePromise (srcTgtPairArr) {
  let copyFilePromiseArr = new Array()
  srcTgtPairArr.forEach(function (srcTgtPair) {
    copyFilePromiseArr.push(copyFilePromise(srcTgtPair[0], srcTgtPair[1]))
  })
  return Promise.all(copyFilePromiseArr)
}

function backupPackageJson () {
  const source = path.join(config.libPath, 'package.json')
  const target = path.join(config.libPath, '_package.json')
  return copyFile(source, target)
}

function restorePackageJson () {
  const source = path.join(config.libPath, '_package.json')
  const target = path.join(config.libPath, 'package.json')
  return copyFile(source, target).then(() => {
    return utils.deleteFile(source)
  })
}

function getPreset () {
  // Detect what commit message convention your repository is using
  // source: https://github.com/conventional-changelog/conventional-commits-detector/blob/master/README.md
  return exec('conventional-commits-detector', {cwd: __base})
    .then((presetRes) => {
      if (!presetRes.stdout || presetRes.stderr) {
        return Promise.reject(presetRes.stderr || false)
      } else {
        const preset = presetRes.stdout.split('\n')[0]
        return Promise.resolve(preset)
      }
    })
}

function getBump () {
  // Detect the recommended bump type by the conventional-commit standard
  // source: https://github.com/conventional-changelog-archived-repos/conventional-recommended-bump/blob/master/README.md
  return exec('conventional-recommended-bump -p angular', {cwd: __base}).then((bumpRes) => {
    if (!bumpRes.stdout || bumpRes.stderr) {
      return Promise.reject(bumpRes.stderr || false)
    } else {
      const bump = bumpRes.stdout.split('\n')[0]
      return Promise.resolve(bump)
    }
  })
}

function getPackageVersion() {
  const packageJson = require(path.join(config.libPath, 'package.json'))
  return Promise.resolve(packageJson.version)
}
