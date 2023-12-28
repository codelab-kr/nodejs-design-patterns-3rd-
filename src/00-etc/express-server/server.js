const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { usersRouter } = require('./routers/users.router')
const { postsRouter } = require('./routers/posts.router')

const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);


// curl 'http://localhost:3000/user/info?name=jhon&age=11'
// curl 'localhost:3000/user/login?id=test&pw=1234'

app.get('/', (_, res) => res.send('HOME'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));