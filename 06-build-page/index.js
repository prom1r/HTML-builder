let fs = require('fs');
const path = require('path');
const patchComponents = path.join(__dirname, 'components')
const pathFolder = path.join(__dirname, 'project-dist')
const pathTemplate = path.join(__dirname, 'template.html')
const pathIndex = path.join(__dirname + /project-dist/, 'index.html')
const pathFileStyles = (path.join(__dirname + /project-dist/, 'style.css'))
const styles = path.join(__dirname, 'styles')
let options = { encoding: 'utf-8', withFileTypes: true };
const patsAssets = path.join(__dirname, 'assets')

console.log(styles)
fs.mkdir(pathFolder, err => {
    if (err) {
        console.log('')
    };
    console.log('Folder created successfully')
})
fs.readFile(pathTemplate, 'utf8', (err, data) => {
    let content = data
    fs.readdir(patchComponents, function(err, items) {
        for (let i = 0; i < items.length; i++) {
            fs.readFile(path.join(__dirname, 'components', items[i]), 'utf8', (err, data) => {
                content = content.replace(`{{${items[i].replace(/\..+$/, '')}}}`, data)
                if (i == (items.length - 1)) {
                    fs.writeFile(pathIndex, content, (err) => {
                        if (err) throw err;
                    })
                }
            })
        }
    })
})

//CSS
fs.open(pathFileStyles, 'w', (err) => {
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
    fs.appendFile(pathFileStyles, '', err => {
        if (err) throw err;
    })
    for (elem of arrCssFiles) {
        fs.readFile(path.join(__dirname + /styles/, elem), (err, data) => {
            fs.appendFile(pathFileStyles, data, err => {
                if (err) throw err;
            })
            if (err) {
                console.error(err)
            }
        })
    }
})

//assets

fs.mkdir(pathFolder + /assets/, (err) => {
    if (err) {
        console.error(err)
    }
})
fs.readdir(patsAssets, options, (err, elem) => {
    for (let i = 0; i < elem.length; i++) {
        if (elem[i].isDirectory()) {
            createdFolder(elem[i].name)
        }
    }
    if (err) {
        console.log('')
    }
})

function createdFolder(path) {
    fs.mkdir(pathFolder + /assets/ + path, (err) => {
        if (err) {
            console.log('')
        }
        fs.readdir((patsAssets + '/' + path), (err, files) => {
            for (let i = 0; i < files.length; i++) {
                fs.copyFile((patsAssets + '/' + path + '/' + files[i]),
                    pathFolder + /assets/ + '/' + path + '/' + files[i], (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        console.log('File copied successfully')
                    });
            }
        })
    })

}