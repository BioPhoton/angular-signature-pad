'use strict'
console.log('BUILD SCRIPT')

const fs = require('fs')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

// config
const rootPath = path.join(__dirname, '..', '..')
const libPath = path.join(rootPath, 'src/libs/angular-signature-pad')
const debugMode = true
const ngPackagr = require(path.join(rootPath, 'node_modules/ng-packagr/lib/ng-packagr'))

// @see https://github.com/TypeStrong/ts-node#programmatic-usage
require('ts-node').register({
  project: path.join(rootPath, 'tsconfig.packagr.json')
})

process.env.DEBUG = debugMode

// build scripts
packaging()
// =============================================================================

async function packaging () {
  console.log('start packaging')
  await ngPackagr.ngPackage({project: path.join(libPath, 'ng-package.json')})
    .then((res) => {
      console.log('done packaging')
    })
    .catch((err) => {
      console.error('Build failed.', err)
      process.exit(1)
    })
  console.log('end packaging')
  const {stdout, stderr} = await exec('npm pack', {cwd: path.join(libPath, 'dist')})
  console.log('end tarball')
  copyStyles()
}

function copyStyles () {
  const source = path.join(libPath, 'src', 'styles.scss')
  const target = path.join(libPath, 'dist', 'styles.scss')
  copyFile(source, target)
}
/**/

function copyFile(source, target) {
  return new Promise(function(resolve, reject) {
    var rd = fs.createReadStream(source);
    rd.on('error', rejectCleanup);
    var wr = fs.createWriteStream(target);
    wr.on('error', rejectCleanup);
    function rejectCleanup(err) {
      rd.destroy();
      wr.end();
      reject(err);
    }
    wr.on('finish', resolve);
    rd.pipe(wr);
  });
}
