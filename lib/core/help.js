const program = require('commander')

const helpOption = () => {
    // 增加自己的options
    program.version(require('../../package.json').version)
        .option('-d, --dest <dest>', 'a destination folder, \nexample: \n-d /src/components')
        .option('-f, --framework <framework>', 'create a project with <framework> , \nexample: \n-f vue')
        .option('-ft, --filetype <filetype>', 'create a file/dir It type is <filetype>, default component, \nexample: \n-ft page\n-ft component')
}

module.exports = helpOption