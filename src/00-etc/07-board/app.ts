import express from 'express'
import * as handlebars from 'express-handlebars'
import { articles } from './mocks'

const app = express()

app.use(express.static('public'))
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Test Board',
    articles
  })
})

app.get('/view/:id', (req, res) => {
  const id = req.params.id
  const article = articles.find((article) => article.id === +id)
  res.render('article', {
    title: 'Test Board',
    article
  })
})

app.get('/write', (req, res) => {
  res.render('write', {
    title: 'Test Board - Write'
  })
})

app.get('/modify/:id', (req, res) => {
  const id = req.params.id
  const article = articles.find((article) => article.id === +id)
  res.render('write', {
    title: 'Test Board - Edit',
    article
  })
})

app.listen(3000, () => {
  console.log('Server is running port 3000 🚀 http://localhost:3000')
})
