// 2. async/await
function one(msg: string) {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(console.log(msg))
    }, 1000)
  })
}

async function oneToTen() {
  for (let x of [...Array(10).keys()]) {
    await one(`${x + 1} 초 경과...`)
  }
  console.log('완료')
}

oneToTen()
