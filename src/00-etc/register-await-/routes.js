import { Router } from 'express';
const router = Router();
import db from './db.js';


function registerPage() {
  return (
    `<div>
      <h1>Register</h1>
      <form method="post" action="/">
        <input type="text" name="username" value="test4"/>
        <input type="password" name="password" value="1234"/>
        <input type="email" name="email" value="test4@test.com" />       
        <button type="submit">Register</button>
      </form>
    </div>`
  );
}
  
function registeredPage(msg) {
  return (
    `<div>
      <h1>Register Succed</h1>
      <p>${msg}</p>
    </div>`
  );
}
  
function getMaxId() {
  const maxId = db.reduce((acc, cur) => {
    return acc.id > cur.id ? acc.id : cur.id;
  }, 0);
  return maxId;
}

function isEmailExist(email) {
  const user = db.filter((user) => user.email === email);
  return user.length > 0;
}

function saveUser(user) {
  const oldDbLength = db.length;
  db.push(user);
  const isSaved = db.length > oldDbLength;
  if (!isSaved) return new Error("User not saved");
  return user; 
}


function sendEmail(user) {
  return new Promise((resolve, reject) => {
    if (!user.email) reject(new Error("Email not found"));
    setTimeout(() => {
      resolve(user);
    }, 1000)  });
}


function getResult(user) {
  return `${user.username} Registerd successfully`;
}

router.get('/', (_, res) => {
  res.send(registerPage());
});

router.get('/users', (_, res) => {
  res.send(db);
});

router.post('/', async (req, res) => {
  const { username, password, email } = req.body;
  const user = { id: getMaxId()+1, username, password, email, createdAt: new Date(), updatedAt: new Date() };
  if (isEmailExist(email)) {
    return res.send({ error: "User already exists" });
  }
  try {
    const savedUser = await saveUser(user);
    const sentUser = await sendEmail(savedUser);
    const msg = getResult(sentUser);
    res.send(registeredPage(msg));
  } catch (err) {
    res.send({ error: err.message });
  }
});

export { router };
