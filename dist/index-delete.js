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
        message: "请输入要删除的模板名称",
        validate: function (val) {
            if (val === '') {
                return 'Name is required!';
            }
            else if (!tplObj[val]) {
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
    delete tplObj[name];
    fs.writeFile(__dirname + "/../template.json", JSON.stringify(tplObj), 'utf-8', function (err) {
        if (err)
            console.log(err);
        console.log('\n');
        console.log(chalk.green('Deleted successfully!\n'));
        console.log(chalk.grey('The latest template list is: \n'));
        console.log(tplObj);
        console.log('\n');
    });
});
//# sourceMappingURL=index-delete.js.map