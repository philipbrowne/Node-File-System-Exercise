const fs = require('fs');
const process = require('process');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error('ERROR: ', err.message);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

if (process.argv[2]) {
  cat(process.argv[2]);
} else {
  console.error('Please add something to read');
  process.exit(1);
}
