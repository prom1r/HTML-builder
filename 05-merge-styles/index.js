const fs = require('fs')
const path = require('path')
const styles = (path.join(__dirname, 'styles'))
const pathFile = (path.join(__dirname, 'project-dist', 'bundle.css'))

fs.open(pathFile, 'w', (err) => {
    if (err) throw err;
    console.log('File created');
})

fs.readdir(styles, (err, files) => {
    if (err) throw err;
    let arrCssFiles = []
    files.forEach(file => {
        if (path.extname(file) == '.css') {
            arrCssFiles.push(file)
        }
    })
    fs.appendFile(pathFile, '', err => {
        if (err) throw err;
    })
    for (elem of arrCssFiles) {
        fs.readFile(path.join(__dirname + /styles/, elem), (err, data) => {

            fs.appendFile(pathFile, data, err => {
                if (err) throw err;
            })
            if (err) {
                console.error(err)
            }
        })
    }
})