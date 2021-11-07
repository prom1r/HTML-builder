const fs = require('fs');
const createReader = fs.createReadStream('01-read-file/text.txt');

createReader.on('data', (data) => {
    console.log(data.toString());
});