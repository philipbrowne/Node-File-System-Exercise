let path;
if (process.argv[2]) {
  path = process.argv[2];
} else {
  path = null;
}

const fs = require('fs');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error('ERROR: ', err.message);
      process.kill(1);
    } else {
      console.log(data);
    }
  });
}

cat(path);
