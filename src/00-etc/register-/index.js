import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes.js';
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});