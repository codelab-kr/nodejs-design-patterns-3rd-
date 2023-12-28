import fs from 'fs/promises'

let dirList = [];

// 디자인 패턴 바이블 연습 4.2 재귀적 파일 리스트 (p. 152)

// https://github.com/sgarmendia/NodeJS-design-patterns-exercises/blob/master/4_async_callbacks/4.2_file_recursive/4.2_file_recursive.mjs
// 위의 것을 참고하긴 했는데 forEach 소스가 이상해서 형식만 참고하여 다시 다 작성

async function readNestedFiles (dir, index, cb) {
  const files = await fs.readdir(dir, { withFileTypes: true })
  const dirs = files.filter(file => file.isDirectory()).map(file =>`${file.path}/${file.name}`);
  dirList = dirList.concat(dirs)
  console.log('====> ', dirs)
  
  if (index === dirList.length) {
    return cb(null, dirList)
  }
  const task = dirList[index];
  console.log(index, task)
  readNestedFiles(task, index+1, cb)
}

readNestedFiles(process.argv[2], 0, (err, dirList)=> {
  if (err) {
    return console.log(err);
  }
  console.log('--- DIRS --- \n', {...dirList});
})