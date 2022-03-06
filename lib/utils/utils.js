const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const { rejects } = require('assert')
// 编译ejs模板
const compile = (template, data) => {
    return new Promise((resolve) => {
        const templatePosition = `../templates/${template}`
        const templatePath = path.resolve(__dirname, templatePosition)

        ejs.renderFile(templatePath, { data }, (err, result) => {
            if (err) {
                rejects(err)
            }
            resolve(result)
        })
    })
}


// 递归创建目录
const createDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        createDir(path.dirname(dirPath))
        fs.mkdirSync(dirPath)
    } else {
        return
    }
}
// 写文件
const writeToFile = (filePath, content) => {
    createDir(path.dirname(filePath))
    return fs.promises.writeFile(filePath, content)
}

module.exports = {
    compile,
    writeToFile
}