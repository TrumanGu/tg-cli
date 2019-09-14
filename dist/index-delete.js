#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var inquirer = require('inquirer');
var chalk = require('chalk');
var fs = require('fs');
var tplObj = require("../template");
var findIndexOfTpl = function (name, tplObj) { return tplObj.findIndex(function (i) { return i.name === name; }); };
var question = [
    {
        name: "name",
        message: "请输入要删除的模板名称",
        validate: function (val) {
            if (val === '') {
                return 'Name is required!';
            }
            else if (findIndexOfTpl(val, tplObj) === -1) {
                return 'Template does not exist!';
            }
            else {
                return true;
            }
        }
    }
];
inquirer
    .prompt(question).then(function (answers) {
    var name = answers.name;
    var indexOfTmp = tplObj.findIndex(function (i) { return i.name === name; });
    if (indexOfTmp === -1) {
        return chalk.red('找不到该模板');
    }
    tplObj.splice(indexOfTmp, 1);
    fs.writeFile(__dirname + "/../template.json", JSON.stringify(tplObj), 'utf-8', function (err) {
        if (err)
            console.log(err);
        console.log('\n');
        console.log(chalk.green('Deleted successfully!\n'));
        console.log(chalk.grey('The latest template list is: \n'));
        tplObj.forEach(function (item) {
            console.log('  ' +
                chalk.yellow('★') +
                '  ' + chalk.yellow(item.name) +
                ' - ' + item.description +
                ' - ' + chalk.red("\u6A21\u677F\u5730\u5740" + item.url));
        });
        console.log('\n');
    });
});
exports["default"] = {};
//# sourceMappingURL=index-delete.js.map