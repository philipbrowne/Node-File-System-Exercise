const fs = require('fs');
const axios = require('axios');
const process = require('process');

let path = process.argv[2];

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

async function webCat(path) {
  try {
    const res = await axios.get(path);
    console.log(res.data);
  } catch (e) {
    console.error(e);
  }
}

if (process.argv[2]) {
  if (path.startsWith('http')) {
    webCat(path);
  } else {
    cat(path);
  }
} else {
  console.error('Please add something to read');
  process.exit(1);
}
