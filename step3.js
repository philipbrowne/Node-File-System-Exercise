const fs = require('fs');
const axios = require('axios');
let path;
let contents;

if (process.argv[2] && process.argv[2] !== '--out') {
  path = process.argv[2];
} else if (process.argv[2] && process.argv[2] === '--out') {
  if (process.argv[3]) {
    path = process.argv[3];
    if (process.argv[4]) {
      contents = process.argv[4];
    } else {
      console.error('Please add contents to output');
    }
  } else {
    console.error('Please add a path');
  }
} else {
  path = null;
}

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err.message);
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

if (process.argv[2] === '--out') {
  if (process.argv.length < 5) {
    console.error('Please add an output file and contents');
  } else if (contents.startsWith('http')) {
    webCatWrite(path, contents);
  } else {
    catWrite(path, contents);
  }
}

function catWrite(path, contents) {
  fs.readFile(contents, 'utf8', (err, data) => {
    if (err) {
      console.error(err.message);
    } else {
      fs.writeFile(path, data, 'utf8', (err) => {
        if (err) {
          console.error(err.message);
          process.kill(1);
        } else {
        }
      });
    }
  });
}

async function webCatWrite(path, contents) {
  let res = await axios.get(contents);
  contents = res.data;
  fs.writeFile(path, contents, 'utf8', (err) => {
    if (err) {
      console.error(err.message);
      process.kill(1);
    } else {
    }
  });
}

if (process.argv[2] !== '--out' && process.argv.length < 5) {
  if (path.startsWith('http')) {
    webCat(path);
  } else {
    cat(path);
  }
}
