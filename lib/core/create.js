const program = require('commander')
const {
    createProjectAction,
    addAction
} = require('./actions')



const createCommands = () => {
    program.command('create <project>')
        .description('clone repository into a folder')
        .action(createProjectAction)

    program.command('add <name>')
        .description("create a component/page of <framework>,<framework> default vue, \nexample: \nadd testComponent\nadd testComponent -d /src/components\nadd testComponent -ft page")
        .action(addAction)
}


module.exports = createCommands