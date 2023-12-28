import { readFileSync } from 'fs';
const cache = new Map();

function consistentRead(filename) {
  if (cache.has(filename)) {
    // invoked synchronously
    return cache.get(filename);
  } else {
    const data = readFileSync(filename, 'utf8');
    cache.set(filename, data);
     return data;
  }
}

function createFileReader(filename) {
  return  consistentRead(filename);
}

const reader1 = createFileReader('1.txt');
  console.log('First call data: ' + reader1);

  // ...sometime later we try to read again from
  // the same file
  const reader2 = createFileReader('1.txt');

    console.log('Second call data: ' + reader2);

