#!/usr/bin/env node

const { program } = require('commander')
const helpOptions = require('./lib/core/help')
const createCommand = require('./lib/core/create')

// 增加一些参数
helpOptions()

// 增加一些命令
createCommand()

program.parse(process.argv)