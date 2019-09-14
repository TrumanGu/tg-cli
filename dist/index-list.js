"use strict";
exports.__esModule = true;
exports["default"] = {};
var fs = require('fs');
var chalk = require('chalk');
var tplJson = require(__dirname + "/../template.json");
tplJson.forEach(function (item) {
    console.log('  ' +
        chalk.yellow('★') +
        '  ' + chalk.yellow(item.name) +
        ' - ' + item.description +
        ' - ' + chalk.red("\u6A21\u677F\u5730\u5740" + item.url));
});
//# sourceMappingURL=index-list.js.map