const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Hello! Input text here (enter "exit" to quit):');

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    rl.close();
  } else {
    writeStream.write(`${input}\n`, (err) => {
      if (err) {
        console.error('Error writing to file:', err.message);
      }
    });
  }
});

const exitHandler = () => {
  console.log('Have a good day! :)');
  rl.close();
  writeStream.end();
  process.exit();
};

rl.on('close', exitHandler);

process.on('SIGINT', exitHandler);
