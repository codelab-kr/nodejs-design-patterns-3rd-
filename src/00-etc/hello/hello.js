// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('http');
let count = 0;

function addLog(count) {
  console.log(count);
}

const server = http.createServer((req, res) => {
  count++;
  addLog(count);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('hello\n');
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  setTimeout(() => {
    res.end('world\n');
  }, 2000);
});

server.listen(8000, () => {
  console.log('Server running at http://localhost:8000/');
});
