var fs = require('fs');
const path = require('path');
const pathTxt = path.join(__dirname, 'secret-folder')
let options = { encoding: 'utf-8', withFileTypes: true };


fs.readdir(pathTxt, options, function(err, items) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].isFile()) {
            let name = items[i].name.replace(/[\.\/]/g, ' - ');
            fs.stat((pathTxt + '/' + items[i].name), (err, stats) => {
                console.log(name + ' - ' + Math.round(stats.size / 1024) + ' kb');
            });
        }
    }
})