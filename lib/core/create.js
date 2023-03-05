const { program } = require('commander');
const { createProjectAction } = require('./actions')

const createCommands = () => {
  program
    .command('create <project>')
    .description('clone a repositories into a folder')
    .action(createProjectAction)
}

module.exports = createCommands