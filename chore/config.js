'use strict'

global.__base = __dirname + '/../'
const path = require('path')
const config = {};

config.libPath = path.join(__base, 'src/libs/angular-signature-pad')
config.debugMode = true
config.ci = {};
config.ci.validState = 'passed'

module.exports = config;
