#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const tplObj = require(`../template`)

const findIndexOfTpl = (name: any, tplObj: Array<any>): Number => tplObj.findIndex((i: any) => i.name === name)

let question = [
  {
    name: "name",
    message: "请输入要删除的模板名称",
    validate(val: any) {
      if (val === '') {
        return 'Name is required!'
      } else if (findIndexOfTpl(val, tplObj) === -1) {
        return 'Template does not exist!'
      } else {
        return true
      }
    }
  }
]

inquirer
  .prompt(question).then((answers: { name: any }) => {
    // answers 就是用户输入的内容
    let { name } = answers;
    const indexOfTmp: Number = tplObj.findIndex((i: any) => i.name === name)
    if (indexOfTmp === -1) {
      return chalk.red('找不到该模板')
    }
    tplObj.splice(indexOfTmp, 1);
    // 更新 template.json 文件
    fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', (err: any) => {
      if (err) console.log(err)
      console.log('\n')
      console.log(chalk.green('Deleted successfully!\n'))
      console.log(chalk.grey('The latest template list is: \n'))
      tplObj.forEach((item: { name: String, description: String, url: String }) => {
        console.log('  ' +
          chalk.yellow('★') +
          '  ' + chalk.yellow(item.name) +
          ' - ' + item.description +
          ' - ' + chalk.red(`模板地址${item.url}`));
      })
      console.log('\n')
    })
  })


export default {}