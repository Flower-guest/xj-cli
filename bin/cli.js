#! /usr/bin/env node

const { program } = require('commander');
const pack = require('../package.json');
const createCommands = require('../lib/core/create')

program
  .name(pack.name)
  .version(`v${pack.version}`)
  .option('-n, --name', pack.name)
  .usage(`<command> [option]`)

// 创建项目
createCommands()

program.parse(process.argv);