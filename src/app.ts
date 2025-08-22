import express from 'express';
import '#db';
import { userRouter } from '#routes';
import { authRouter, postRouter } from '#routes';
import productRouter from './routers/productRoutes.ts';
import categoryRouter from './routers/categoryRoutes.ts';
import { errorHandler, notFoundHandler } from '#middlewares';



const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use(errorHandler);
app.use('*splat', notFoundHandler);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/posts', postRouter);
app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



