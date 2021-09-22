const fs = require('fs');
const axios = require('axios');
const process = require('process');
let args = [];
let paths = [];
let contents = [];
let path;

if (process.argv[2] && process.argv[2] !== '--out') {
  path = process.argv[2];
} else if (process.argv[2] === '--out') {
  args = process.argv.slice(3);
  if (args.length % 2 !== 0) {
    console.error('Missing required arguments');
    process.exit(1);
  } else {
    for (let i = 0; i < args.length; i++) {
      if (i % 2 == 0) {
        paths.push(args[i]);
      } else {
        contents.push(args[i]);
      }
    }
  }
} else {
  console.error('Please insert arguments');
  process.exit(1);
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
  if (paths.length === 0) {
    console.error('Please add an output file and contents');
    process.exit[1];
  } else {
    for (let i = 0; i < args.length / 2; i++) {
      if (contents[i].startsWith('http')) {
        webCatWrite(paths[i], contents[i]);
      } else {
        catWrite(paths[i], contents[i]);
      }
    }
  }
}

function catWrite(path, contents) {
  fs.readFile(contents, 'utf8', (err, data) => {
    if (err) {
      console.error(err.message);
      process.kill(1);
    } else {
      writeFile(path, data);
    }
  });
}

async function webCatWrite(path, contents) {
  try {
    let res = await axios.get(contents);
    writeFile(path, res.data);
  } catch (e) {
    console.error(e);
    process.kill(1);
  }
}

function writeFile(path, contents) {
  fs.writeFile(path, contents, 'utf8', (err) => {
    if (err) {
      console.error(err.message);
      process.kill(1);
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
