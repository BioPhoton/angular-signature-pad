global.__base = __dirname + '/../'
console.log('__base', __base);
const path = require('path')
const config = {};

config.libPath = path.join(__base, 'src/libs/angular-signature-pad')
config.debugMode = true

module.exports = config;
