#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const tplObj = require(`../template`)
const program = require('commander')

// 对输入进行验证
let question = [
    {
        name: "name",
        type: 'input',
        message: "请输入模板名称",
        validate(val: any) {
            if (val === '') {
                return 'Name is required!'
            } else if (tplObj[val]) {
                return 'Template has already existed!'
            } else {
                return true
            }
        }
    },
    {
        name: "url",
        type: 'input',
        message: "请输入模板地址",
        validate(val: any) {
            if (val === '') return 'The url is required!'
            return true
        }
    },
    {
        name: "description",
        type: 'input',
        message: "请输入模板描述",
        validate(val: any) {
            if (val === '') return 'The description is required!'
            return true
        }
    },
]

inquirer
    .prompt(question).then((answers: { name: any, url: any, description: any }) => {
        let { name, url, description } = answers;
        // 过滤 unicode 字符 详情参考http://www.ruanyifeng.com/blog/2014/12/unicode.html
        let newTplObj: any = {
            name: name.replace(/[\u0000-\u0019]/g, ''),
            url: url.replace(/[\u0000-\u0019]/g, ''),
            description: description.replace(/[\u0000-\u0019]/g, ''),
        }
        tplObj.push(newTplObj)
        // 把模板信息写入 template.json 文件中
        fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', (err: any) => {
            if (err) console.log(err)
            console.log('\n')
            console.log(chalk.green('Added successfully!\n'))
            console.log(chalk.grey('The latest template list is: \n'))
            tplObj.forEach((item: { name: String, description: String, url: String }) => {
                console.log('  ' +
                    chalk.yellow('★') +
                    '  ' + chalk.yellow(item.name) +
                    ' - ' + item.description +
                    ' - ' + chalk.red(`模板地址${item.url}`));
            })
            console.log('\n');
        })
    })