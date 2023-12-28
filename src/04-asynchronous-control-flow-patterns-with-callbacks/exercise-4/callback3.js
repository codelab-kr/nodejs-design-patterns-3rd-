import { readFile } from 'fs';
const cache = new Map();

function inconsistentRead(filename, cb) {
  if (cache.has(filename)) {
    process.nextTick(() => cb(cache.get(filename)));
  } else {
    readFile(filename, 'utf8', (err, data) => {
      cache.set(filename, data);
      cb(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];
  inconsistentRead(filename, value => {
    listeners.forEach(listener => { listener(value)
    console.log('listener ===> ', listener(value))
  });

  });
  // console.log('listeners', listeners);
  return {
    onDataReady: listener => listeners.push(listener)
  };
}

const reader1 = createFileReader('1.txt');
reader1.onDataReady(data => {
  console.log('First call data: ' + data);

  // ...sometime later we try to read again from
  // the same file
  const reader2 = createFileReader('1.txt');
  reader2.onDataReady(data => {
    console.log('Second call data: ' + data);
  });
});