'use strict'

const fs = require('fs')
const path = require('path')
const utils = {}

utils.copyFile = copyFile
utils.copyFilePromise = copyFilePromise
utils.copyMultiFilePromise = copyMultiFilePromise

module.exports = utils

function copyFile(source, target, cb) {
    console.log("CopyFile", source, target);

    var ensureDirectoryExistence = function (filePath) {
        var dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
            return true;
        }
        ensureDirectoryExistence(dirname);
        fs.mkdirSync(dirname);
    }
    ensureDirectoryExistence(target);

    var cbCalled = false;
    var rd = fs.createReadStream(source);
    rd.on("error", function (err) {
        done(err);
    });
    var wr = fs.createWriteStream(target);
    wr.on("error", function (err) {
        done(err);
    });
    wr.on("close", function (ex) {
        done();
    });
    rd.pipe(wr);
    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
}

function copyFilePromise(source, target) {
    return new Promise(function (accept, reject) {
        copyFile(source, target, function (data) {
            if (data === undefined) {
                accept();
            } else {
                reject(data);
            }
        });
    });
}

function copyMultiFilePromise(srcTgtPairArr) {
    var copyFilePromiseArr = new Array();
    srcTgtPairArr.forEach(function (srcTgtPair) {
        copyFilePromiseArr.push(copyFilePromise(srcTgtPair[0], srcTgtPair[1]));
    });
    return Promise.all(copyFilePromiseArr);
}
