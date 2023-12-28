import fs from 'fs/promises'
import path from 'path';
    
// let fileList = [];
let dirList = [];
let findList = [];

async function recursiveFind(dir, keyword, index, cb) {
  const files = await fs.readdir(dir, {  withFileTypes: true })
  const txtFiles = files.filter(file => !file.isDirectory()).map(file =>`${file.path}/${file.name}`)
                  .filter(file => path.extname(file) === '.txt');
  await Promise.all(txtFiles.map(async file => {
    const content = await fs.readFile(file, {encoding: 'utf-8'});
    if (content.includes(keyword)) {
      findList.push(file);
    }
  }));

  const dirs = files.filter(file => file.isDirectory()).map(file =>`${file.path}/${file.name}`);
  dirList = dirList.concat(dirs)
  if (index === dirList.length) {
    return cb(null, findList)
  }
  const task = dirList[index];
  recursiveFind(task, keyword, index+1, cb)
}

recursiveFind(process.argv[2], process.argv[3], 0, (err, findList)=> {
  if (err) {
    return console.log(err);
  }
  console.log('--- FINDS --- \n', {...findList});
 }
)