const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(filePath, 'utf8');

readStream.on('data', chunk => {
    console.log(chunk);
});

readStream.on('end', () => {
    console.log('Finished reading file.');
});

readStream.on('error', err => {
    console.error(`Error reading file at ${filePath}:`, err.message);
});