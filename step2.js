const fs = require('fs');
const axios = require('axios');

let path;
if (process.argv[2]) {
  path = process.argv[2];
} else {
  path = null;
}

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

async function webCat(path) {
  try {
    const res = await axios.get(path);
    console.log(res.data);
  } catch (e) {
    console.error(e);
  }
}

if (path.startsWith('http')) {
  webCat(path);
} else {
  cat(path);
}
