const primeteivedateTypes = [
  'number',
  'bealan',
  'string',
  'symbol',
  'null',
  'undefined'
]

// 얕은 복사
function copyForObj(obj) {
  const newObj: typeof obj = {}
  for (const prop in obj) {
    newObj[prop] = obj[prop]
  }
  return newObj
}

// 깊은복사 1
function deepCopy(obj) {
  let newObj: typeof obj = {}
  if (obj !== null && typeof obj === 'object') {
    for (const prop in obj) {
      newObj[prop] = deepCopy(obj[prop])
    }
  }
  newObj = obj
  return newObj
}

// 깊은복사 2 -- 메소드는 복사x
function deepCopy2(obj) {
  return JSON.parse(JSON.stringify(obj))
}

// 깊은복사 3
function deepCopy3(obj) {
  return { ...obj }
}

// 깊은복사 4
function deepCopy4(obj) {
  return Object.create(obj)
}


const obj = {
  name: 'kim',
  gender: 'male',
  hobbies: ['축구', '야구', '배구', { first: '뜨게질', second: '십자수' }],
  f1: () => console.log('f1')
}

const obj2 = deepCopy(obj)

console.log(obj2)

obj2['name'] = 'lee'

if (obj !== obj2) {
  console.log('새로운 객체로 복사되었습니다.')
  console.log(`이름이 변경되었습니다. ${obj.name} -> ${obj2.name}`)
  console.log(obj2.hobbies instanceof Object)
  obj2.f1()
}
