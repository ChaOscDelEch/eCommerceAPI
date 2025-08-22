import { Router } from 'express';
import {getAllPosts } from '#controllers';
const postRouter = Router();

postRouter
.route('/')
.get(getAllPosts);

export default postRouter;