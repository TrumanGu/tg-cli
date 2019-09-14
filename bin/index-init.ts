#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const tplObj = require(`${__dirname}/../template`)
const findIndexOfTpl = (name: any, tplObj: Array<any>): Number => tplObj.findIndex((i: any) => i.name === name)

program
  .usage('<template-name> [project-name]')
program.parse(process.argv)
// 当没有输入参数的时候给个提示
if (program.args.length < 1) { return program.help() }

let templateName = program.args[0]
let projectName = program.args[1]

const indexOfTpl = findIndexOfTpl(templateName, tplObj)
if (indexOfTpl === -1) {
  return console.log(chalk.red('\n Template does not exit! \n '))
}
if (!projectName) {
  console.log(chalk.red('\n Project should not be empty! \n '))
  return
}

const url = tplObj[indexOfTpl].url;

console.log(chalk.white('\n Start generating... \n'))
const spinner = ora("Downloading...");
spinner.start();

download(
  url,
  projectName,
  (err: any) => {
    if (err) {
      spinner.fail();
      console.log(chalk.red(`Generation failed. ${err}`))
      return
    }

    spinner.succeed();
    console.log(chalk.green('\n Generation completed!'))
    console.log('\n To get started')
    console.log(`\n    cd ${projectName} \n`)
  }
)



export default {}