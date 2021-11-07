const fs = require('fs');
const path = require('path');
const output = process.stdout
const input = process.stdin
const readline = require('readline')
const rl = readline.createInterface({ input, output });
const pathTxt = path.join(__dirname, 'mynotes.txt')

fs.writeFile(
    pathTxt,
    '',
    (err) => {
        if (err) throw err
        console.log('Hello, please enter text.')
    })

rl.on('line', (input) => {
    if (input === 'exit') {
        rl.close()
        return
    }
    fs.appendFile(pathTxt, input + '\n', (err) => {
        if (err) throw err;
    });
});

rl.on('close', () => {
    console.log('The process is over, goodbye.')
});