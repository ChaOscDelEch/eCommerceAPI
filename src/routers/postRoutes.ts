import { Router } from 'express';
import { createPost, getAllPosts, updatePost, deletePost, getSinglePost } from '#controllers';
import { authenticate, authorize } from '#middlewares'
const postRouter = Router();

postRouter
.route('/')
.get(getAllPosts)
.post(authenticate, createPost)

postRouter
.route('/:id')
.put(authenticate, authorize, updatePost)
.get(getSinglePost)
.put(authenticate, authorize, updatePost)
.delete(authenticate, authorize, deletePost)

export default postRouter;