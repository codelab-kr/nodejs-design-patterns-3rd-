import axios from 'axios'

async function getData(url: string) {
  try {
    return await axios.get(url).then((res) => res?.data?.articleList)
  } catch (error: any) {
    if (error.response?.status !== 200) {
      return console.error('Error:', error.response?.data ?? error.message)
    }
  }
}

async function getTop20Movies() {
  const url =
    'https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json'
  const movies = await getData(url)
  if (!movies) return console.error('Error: No data')
  return movies?.map((movie: any, idx: number) => {
    console.log(`[ ${idx + 1}위 ] ${movie.title}`)
    return {
      title: movie.title,
      rank: idx + 1
    }
  })
}

getTop20Movies()
