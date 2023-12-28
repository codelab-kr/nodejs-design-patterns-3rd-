const router = require('express').Router();

function info(req, res) {
  const user = req.query;
  if (user.name && user.age) {
    const { name, age } = user;
    res.json(`[user] name: ${name}, age: ${age}`);
  } else {
    throw new Error('사용자 정보가 없습니다.');
  }
};

function feed(_, res) {
  const feed = 
    `<h1>Feed</h1>
    <ul>
      <li>picture 1</li>
      <li>picture 2</li>
      <li>picture 3</li>
    </ul>`;
  res.send(feed);
};

function login(req, res) {
  if (req.query?.id === 'test' && req.query?.pw === '1234') {
    res.send(`${query?.id}님 환영합니다.`);
  } else {
    res.send('로그인 실패');
  }
};

router.get('/info', info );
router.get('/feed', feed );
router.get('/login', login );

exports.usersRouter = router;