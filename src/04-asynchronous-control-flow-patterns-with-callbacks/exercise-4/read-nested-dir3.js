import { promises as fs } from 'fs'
import path from 'path'

let dirList = [];

// 디자인 패턴 바이블 연습 4.2 재귀적 파일 리스트 (p. 152)
// 책을 참고해서 하기는 헸는데.. 이해가 안 감...

// 헬퍼함수
async function iterateSeries (collection, iteratorCallback, finalCallback) {
  if (collection.length === 0) return process.nextTick(finalCallback);
  function iterate (index) {
    if (index === collection.length) return process.nextTick(finalCallback);
    iteratorCallback(collection[index], err => {
      if(err) return finalCallback(err);
      iterate (index + 1);
    });
  }
  iterate(0)
}

async function getSubDirs (dirPath) {
  const files = await fs.readdir(dirPath, { withFileTypes: true })
  return files.filter(file=>file.isDirectory()).map(dir => path.resolve(dirPath, dir.name));
}

// 경로 안의 모든 디렉토리를 재귀적으로 출력
async function listNestedFiles (currentDir, cb) {
  const dirs = await getSubDirs(currentDir);
  dirList = dirList.concat(dirs);
  
  iterateSeries(dirs, listNestedFiles, cb);
}


listNestedFiles(process.argv[2], err =>{
  if (err) return console.error(err);
  console.log("all done\n", {...dirList});
})