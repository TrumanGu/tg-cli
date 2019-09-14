export default{}
const fs = require('fs');
const chalk = require('chalk');
const tplJson = require(`${__dirname}/../template.json`);


tplJson.forEach((item: { name: String, description: String, url: String }) => {
    console.log('  ' +
        chalk.yellow('★') +
        '  ' + chalk.yellow(item.name) +
        ' - ' + item.description +
        ' - ' + chalk.red(`模板地址${item.url}`));
})

