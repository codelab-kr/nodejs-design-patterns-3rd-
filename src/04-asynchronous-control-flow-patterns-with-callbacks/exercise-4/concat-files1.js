import { promises as fs } from 'fs'

// 디자인 패턴 바이블 연습 4.1 파일연결 (p. 152)
// 콜백 범위였지만 콜백사용이 손에 익지 않아서 일단 처음 답은 async, await, promise 를 사용 (자동완성기능 사용x)
async function concatFiles (dest, ...filenames) {
  return await Promise.all(filenames.map(filename => fs.readFile(filename)))
    .then(contents => contents.join('\n\n'))
    .then(joinedContents => fs.writeFile(dest, joinedContents))
    .catch(err => console.log(err))
}

concatFiles('concat.txt', '1.txt', '2.txt', '3.txt')
// concatFiles('concat.txt', '1.txt', '2.txt', '3.txt', '4.txt') // error test