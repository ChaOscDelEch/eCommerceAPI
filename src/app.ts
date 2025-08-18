import express from 'express';
import '#db';
import { userRouter } from '#routes';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', userRouter);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
