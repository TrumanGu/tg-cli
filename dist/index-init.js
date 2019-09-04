#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var program = require("commander");
var chalk = require("chalk");
var ora = require("ora");
var download = require("download-git-repo");
var tplObj = require();
program
    .usage('<template-name> [project-name]');
program.parse(process.argv);
if (program.args.length < 1)
    return program.help();
var templateName = program.args[0];
var projectName = program.args[1];
if (!tplObj[templateName]) {
    console.log(chalk.red('\n Template does not exit! \n '));
    return;
}
if (!projectName) {
    console.log(chalk.red('\n Project should not be empty! \n '));
    return;
}
url = tplObj[templateName];
console.log(chalk.white('\n Start generating... \n'));
var spinner = ora("Downloading...");
spinner.start();
download(url, projectName, function (err) {
    if (err) {
        spinner.fail();
        console.log(chalk.red("Generation failed. " + err));
        return;
    }
    spinner.succeed();
    console.log(chalk.green('\n Generation completed!'));
    console.log('\n To get started');
    console.log("\n    cd " + projectName + " \n");
});
//# sourceMappingURL=index-init.js.map