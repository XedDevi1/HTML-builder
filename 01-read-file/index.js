const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

if (!fs.existsSync(filePath)) {
    console.error('File does not exist:', filePath);
    process.exit(1);
}

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