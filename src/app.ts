import express from 'express';
import '#db';
import { userRouter } from '#routes';
import { authRouter, postRouter } from '#routes';
import cookieParser from 'cookie-parser';
import productRouter from './routers/productRoutes.ts';
import categoryRouter from './routers/categoryRoutes.ts';
import { errorHandler, notFoundHandler } from '#middlewares';



const app = express();
const port = 3000;

app.use(express.json(), cookieParser());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/posts', postRouter);
app.use('*splat', notFoundHandler);
app.use(errorHandler);
app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



