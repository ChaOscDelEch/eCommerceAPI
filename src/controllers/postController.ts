import type { RequestHandler } from 'express';
import { Post } from '#models';

export const getAllPosts : RequestHandler = async (req, res,) => {
    const posts = await Post.find().lean().populate('author');

    if (posts.length === 0)
        throw new Error('No posts found', {cause: {status: 404}});
    
    res.json(posts);
}