const user = (req, res, query) => {
  const user = query;
  if (user) {
    const { name, age } = user;
    res.end(`[user] name: ${name}, age: ${age} 환영합니다.`);
  } else {
    notFound(req, res, 'user not found');
  }
};

const feed = (req, res) => {
  const feed = `<h1>Feed</h1>
<ul>
  <li>picture 1</li>
  <li>picture 2</li>
  <li>picture 3</li>
</ul>`;
  res.end(feed);
};

const login = (req, res, query) => {
  if (query?.id === 'test' && query?.pw === '1234') {
    res.end(`${query?.id}님 환영합니다.`);
  } else {
    res.end('로그인 실패');
  }
};

const notFound = (req, res, msg) => {
  res.end(msg);
};

module.exports = { user, feed, login, notFound };
