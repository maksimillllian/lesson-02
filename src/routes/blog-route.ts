import { Router } from "express";
import { authMiddleware } from "../middlewares/auth/auth-middleware";
import { blogValidation } from "../validators/blog-validators";
import { BlogRepository } from "../repositories/blog-repository";
import { Request, Response } from "express";
import {ObjectId, WithId} from "mongodb";
import {InsertBlogType, OutputBlogType} from "../models/blog/output/blog.output.models";

export const blogRoute = Router({})

blogRoute.get('/', async (req, res) => {
    const blogs = await BlogRepository.getAll();
    res.send(blogs);
});

blogRoute.post('/', authMiddleware, blogValidation(), async (req: Request, res: Response) => {
    try {
        const { name, description, websiteUrl } = req.body;
        const newBlog: WithId<OutputBlogType> = {
            id: new Date().toISOString(),
            name,
            description,
            websiteUrl,
            isMembership: false,
            createdAt: new Date().toISOString(),
            _id: new ObjectId()
        };

        const createdBlogId = await BlogRepository.createBlog(newBlog);

        const blog = await BlogRepository.getById(createdBlogId);

        if (!blog) {
            res.sendStatus(404);
            return;
        }

        res.status(201).send(blog);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

blogRoute.get('/:id', async (req: Request, res: Response) => {
    if(!ObjectId.isValid(req.params.id)){
        res.sendStatus(404)
        return;
    }
    const blog = await BlogRepository.getById(req.params.id);

    if (blog) {
        res.status(200).send(blog);
    } else {
        res.sendStatus(404);
    }
});

blogRoute.put('/:id', authMiddleware, blogValidation(), async (req: Request, res: Response) => {
    if(!ObjectId.isValid(req.params.id)){
        res.sendStatus(404)
        return;
    }
    const { name, description, websiteUrl } = req.body;
    const updatedBlog = {
        name,
        description,
        websiteUrl
    };
    const result = await BlogRepository.updateBlog(req.params.id,updatedBlog);
    if (result) {
        res.status(204).send(result);
    } else {
        res.sendStatus(404);
    }
});

blogRoute.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    if(!ObjectId.isValid(req.params.id)){
        res.sendStatus(404)
        return;
    }
    const result = await BlogRepository.deleteBlog(req.params.id);
    if (result) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});
