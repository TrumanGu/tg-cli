#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var inquirer = require("inquirer");
var chalk = require("chalk");
var fs = require("fs");
var tplObj = require();
var question = [
    {
        name: "name",
        type: 'input',
        message: "请输入模板名称",
        validate: function (val) {
            if (val === '') {
                return 'Name is required!';
            }
            else if (tplObj[val]) {
                return 'Template has already existed!';
            }
            else {
                return true;
            }
        }
    },
    {
        name: "url",
        type: 'input',
        message: "请输入模板地址",
        validate: function (val) {
            if (val === '')
                return 'The url is required!';
            return true;
        }
    }
];
inquirer
    .prompt(question).then(function (answers) {
    var name = answers.name, url = answers.url;
    tplObj[name] = url.replace(/[\u0000-\u0019]/g, '');
    fs.writeFile(__dirname + "/../template.json", JSON.stringify(tplObj), 'utf-8', function (err) {
        if (err)
            console.log(err);
        console.log('\n');
        console.log(chalk.green('Added successfully!\n'));
        console.log(chalk.grey('The latest template list is: \n'));
        console.log(tplObj);
        console.log('\n');
    });
});
//# sourceMappingURL=index-add.js.map