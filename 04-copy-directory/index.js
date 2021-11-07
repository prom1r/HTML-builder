const fs = require('fs')
const path = require('path')
const files = path.join(__dirname, 'files')
const newFile = path.join(__dirname, 'files-copy')





fs.mkdir(newFile, err => {
    if (err) {
        console.log('')
    }
    fs.readdir(newFile, (err, data) => {
        for (elem of data) {
            fs.unlink(newFile + '/' + elem, (err) => {
                if (err) throw err
            })
        }
        fs.readdir(files, (err, data) => {
            for (elem of data) {
                fs.copyFile(path.join(files, elem), path.join(newFile + '/' + path.basename(elem)), err => {
                    if (err) throw err
                })
            }
        })
    });

})