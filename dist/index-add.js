#!/usr/bin/env node
var inquirer = require('inquirer');
var chalk = require('chalk');
var fs = require('fs');
var tplObj = require("../template");
var program = require('commander');
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
    },
    {
        name: "description",
        type: 'input',
        message: "请输入模板描述",
        validate: function (val) {
            if (val === '')
                return 'The description is required!';
            return true;
        }
    },
];
inquirer
    .prompt(question).then(function (answers) {
    var name = answers.name, url = answers.url, description = answers.description;
    var newTplObj = {
        name: name.replace(/[\u0000-\u0019]/g, ''),
        url: url.replace(/[\u0000-\u0019]/g, ''),
        description: description.replace(/[\u0000-\u0019]/g, '')
    };
    tplObj.push(newTplObj);
    fs.writeFile(__dirname + "/../template.json", JSON.stringify(tplObj), 'utf-8', function (err) {
        if (err)
            console.log(err);
        console.log('\n');
        console.log(chalk.green('Added successfully!\n'));
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
//# sourceMappingURL=index-add.js.map