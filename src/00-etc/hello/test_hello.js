// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('k6/http');

export const options = {
  vus: 145,
  duration: '10s',
};

export default function () {
  http.get('http://localhost:8000');
}
