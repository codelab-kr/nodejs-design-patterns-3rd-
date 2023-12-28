import { Router } from 'express';
const router = Router();
import db from './db.js';

function getMaxId() {
  const maxId = db.reduce((acc, cur) => {
    return acc.id > cur.id ? acc.id : cur.id;
  }, 0);
  return maxId;
}

function registerPage() {
  return (
    `<div>
      <h1>Register</h1>
      <form method="post" action="/register">
        <input type="text" name="username" value="test4"/>
        <input type="password" name="password" value="1234"/>
        <input type="email" name="email" value="test4@test.com" />       
        <button type="submit">Register</button>
      </form>
    </div>`
  );
}


function sendEmail(email) {
  console.log(`Send email to ${email}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

function registeredPage() {
  return (
    `<div>
      <h1>Register Succed</h1>
    </div>`
  );
}

router.post('/register', async (req, res) => {
    console.log(req.body);
    const { username, password, email } = req.body;
    const user = db.filter((user) => user.email === email)[0];
    let isSuccessful = false;
    if (user) {
      return { error: "User already exists" };
    }
    db.push({ id: getMaxId()+1, username, password, email, createdAt: new Date(), updatedAt: new Date() });
    await sendEmail(email).then((result) => isSuccessful = result.success ).catch((err) => console.log(err));
    if (isSuccessful) {
      console.log(db)
      res.send(registeredPage());
    } else {
      res.send({ error: "Email sending failed" });
    }
  }
  );

router.get('/register', (_, res) => {
  res.send(registerPage());
});

export { router };
