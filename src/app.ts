import express from 'express';
import '#db';
import { userRouter } from '#routes';
import { authRouter } from '#routes';
import productRouter from './routers/productRoutes.ts';
import categoryRouter from './routers/categoryRoutes.ts';


const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter); 
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

