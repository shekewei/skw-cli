
const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const { vuePepo, reactPepo } = require('../config/repo-config')
const { commandSpan } = require("../utils/teminal")
const { compile, writeToFile } = require("../utils/utils")
const path = require('path')
const fs = require('fs')
const program = require('commander')

const options = program.opts()
const { framework = 'vue', filetype = 'component' } = options

const createProjectAction = async (projectName) => {
    console.log(`skw help you to creating your project(${projectName}) of(${framework})~`)

    const projectPath = framework === 'vue' ? vuePepo : reactPepo
    await download(`direct:${projectPath}`, projectName, { clone: true })

    const npmResult = await commandSpan("npm", ['i'], { cwd: `./${projectName}` })

    // if (npmResult) {
    //     await commandSpan("npm", ['start'], { cwd: `./${projectName}` })
    // }

}
//创建组件/页面的action
const addAction = async (name) => {
    const { dest } = options
    const defaultDest = filetype === 'component' ? '/src/components' : '/src/views'
    let targetPath = path.join(process.cwd(), dest || defaultDest)
    let templateName = ''
    if (framework === 'react') {
        templateName = 'react-components.ejs'
        targetPath = path.resolve(targetPath, filetype === 'component' ? `${name}.jsx` : `${name}/index.jsx`)
    } else if (framework === 'vue') {
        templateName = 'vue-components.ejs'
        targetPath = path.resolve(targetPath, filetype === 'component' ? `${name}.vue` : `${name}/index.vue`)
    }
    if (fs.existsSync(targetPath)) {
        throw new Error(`${filetype} is existed`)
    }
    // 编译ejs模板
    const result = await compile(templateName, { name, lowerName: name.toLowerCase() })
    // 将result写入.vue/jsx文件中
    if (result) {
        await writeToFile(targetPath, result)
    }

}


module.exports = {
    createProjectAction,
    addAction
}