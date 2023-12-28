// 실행
// yarn run dev2 src/04-asynchronous-control-flow-patterns-with-callbacks/exercise-4/nested-dir-rename-files '/Users/bm/Library/CloudStorage/OneDrive-dgu.ac.kr/학습/node.js 백엔드 개발자 되기-1장'

// 디자인 패턴 바이블 연습 4.2 재귀적 파일 리스트 (p. 152)
// 책을 참고해서 하기는 헸는데...

import { promises as fs } from 'fs'
import path from 'path'

// let dirList: string[] = []
// let fileList: string[] = []

let fileCount = 0
let renamedCount = 0

function lpad(str: string, length: number, char: string = ' ') {
  return str.padStart(length, char)
}

async function renameFile(currentPath: string) {
  const ext = path.extname(currentPath)
  const currentDirname = path.dirname(currentPath)
  const currentName = path.basename(currentPath, ext)
  const newName = lpad(currentName, 3, '0') + ext
  const newPath = path.resolve(currentDirname, newName)
  await fs.rename(currentPath, newPath).catch(console.error)
  console.log(`[rename][${++renamedCount}] ${currentPath} -> ${newPath}`)
}

// 헬퍼함수
async function iterateSeries(
  collection: any,
  iteratorCallback: CallableFunction,
  finalCallback: CallableFunction
) {
  if (collection.length === 0) return process.nextTick(finalCallback)
  function iterate(index: number) {
    if (index === collection.length) return process.nextTick(finalCallback)
    iteratorCallback(collection[index], (err: Error) => {
      if (err) return finalCallback(err)
      iterate(index + 1)
    })
  }
  iterate(0)
}

async function renameFilesInNestedDirs(dirPath: string, cb: CallableFunction) {
  const files = await fs.readdir(dirPath, { withFileTypes: true })
  const noneDirs = files
    .filter((file) => !file.isDirectory() && file.name !== '.DS_Store')
    .map((file) => path.resolve(dirPath, file.name))

  fileCount += noneDirs.length
  noneDirs.forEach(async function (filePath) {
    await renameFile(filePath)
  })

  const dirs = files
    .filter((file) => file.isDirectory())
    .map((dir) => path.resolve(dirPath, dir.name))

  // fileList = fileList.concat(noneDirs)
  // dirList = dirList.concat(dirs)

  iterateSeries(dirs, renameFilesInNestedDirs, cb)
}

renameFilesInNestedDirs(process.argv[2], (err: Error) => {
  if (err) return console.error(err)
  console.log(`[done] file count: ${fileCount}`)
  // console.log({ ...dirList })
  // console.log({ ...fileList })
})
