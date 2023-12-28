import { promises as fs } from 'fs'
import path from 'path'

let count = 0

// 디자인 패턴 바이블 연습 4.2 재귀적 파일 리스트 (p. 152)
// 책을 참고해서 하기는 헸는데.. 이해가 안 감...

async function getSubDirs (dirPath) {
  const files = await fs.readdir(dirPath, { withFileTypes: true })
  return files.filter(file=>file.isDirectory()).map(dir => path.resolve(dirPath, dir.name));
}


// 경로 안의 모든 디렉토리를 재귀적으로 출력
async function listNestedFiles (currentDir, cb) {
  const dirs = await getSubDirs(currentDir);
  // console.log('===========\n', dirs)

  function iterate (index) {
    if (index === dirs.length) return process.nextTick(cb);
    listNestedFiles(dirs[index], err => {
      if (err) return cb(err)
      console.log('=========== listNestedFiles \n', dirs)
      console.log(count++, index, dirs.length, dirs[index])
      iterate(index + 1) 
    })
  }

  iterate(0)
}


listNestedFiles(process.argv[2], err =>{
  if (err) return console.error(err);
  console.log("all done");
})