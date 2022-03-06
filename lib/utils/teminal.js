/* 
    执行终端命令相关的代码
*/

const { spawn } = require('child_process')

const isWin32 = process.platform === 'win32'

const commandSpan = (...rest) => {
    return new Promise((resolve, reject) => {
        let [command, args = [], options = {}] = rest
        // windows上执行命令实际上都是 <command>.cmd
        command = isWin32 ? `${command}.cmd` : command
        const childProcess = spawn(command, args, options)
        childProcess.stdout.pipe(process.stdout)
        childProcess.stderr.pipe(process.stderr)
        childProcess.on('data', (data) => {
            console.log(`stdout:${data}`)
        })
        childProcess.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            resolve(true)
        })
        childProcess.on('error', (err) => {
            console.log(`child process err all stdio with err ${err}`);
            reject(err)
        })
        childProcess.on('exit', (code) => {
            console.log(`child process exited with code ${code}`);
        })
    })

}

module.exports = {
    commandSpan
}