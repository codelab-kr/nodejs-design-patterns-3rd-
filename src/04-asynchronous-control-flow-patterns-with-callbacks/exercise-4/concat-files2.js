import fs from 'fs'

// 디자인 패턴 바이블 연습 4.1 파일연결 (p. 152)
// 최대한 재귀함수와 콜백을 사용하여 다시 작성 (자동완성기능 사용x)
function concatFiles (...args) {
  const cb = args.pop()
  const dest = args.pop()
  const files = args

  function iterater (index) {
    if (index === files.length) return cb();
    fs.readFile(files[index++], (err, res) => {
      if (err) return cb(err)
      fs.appendFile(dest, res, err => {
        if (err) return cb(err)
        iterater(index)
      })
    })
  }
  iterater(0)
}

concatFiles('1.txt', '2.txt', '3.txt', 'concat.txt', (err) => {
    if (err) return console.log('--- ERROR ---\n', err);
    console.log('--- SUCCED ---');
  }
);
