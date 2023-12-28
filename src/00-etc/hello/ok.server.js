const http = require('http');
const url = require('url');
const { user, feed, login, notFound } = require('./ok.controller');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  const { pathname: path, query } = url.parse(req.url, true);

  if (routes[path]) {
    routes[path](req, res, query);
  } else {
    notFound(req, res, '404 Not Found');
  }

  // curl 'localhost:3000/user?name=jhon&age=11'
  // curl 'localhost:3000/login?id=test&pw=1234'
});

const routes = {
  '/': (req, res) => res.end('Home'),
  '/user': user,
  '/feed': feed,
  '/login': login,
};

server
  .listen(3000, () => {
    console.log(' OK 서버 시작! http://localhost:3000/');
  })
  .on('error', (err) => {
    console.error(err);
  });
