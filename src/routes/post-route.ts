import {Router} from "express";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validators";
import {PostRepository} from "../repositories/post-repository";
import {Request, Response} from "express";
import {BlogRepository} from "../repositories/blog-repository";
import {InsertPostModel, OutputPostModel, OutputPostModelAlpha} from "../models/posts/output";
import {ObjectId} from "mongodb";

export const postRoute = Router({})

postRoute.get('/',async (req, res) => {
    const posts = await PostRepository.getAll()
    res.send(posts)
})
postRoute.post('/', authMiddleware, postValidation(),async (req: Request, res: Response) => {
    const {title, shortDescription, content, blogId} = req.body
    const newPost : InsertPostModel = {
        id: String(new Date().getTime()),
        title,
        shortDescription,
        content,
        blogId,
        blogName: await BlogRepository.getNameById(blogId),
        createdAt: new Date().toISOString(),
        _id: new ObjectId()
    }
    const createdPost = await PostRepository.createPost(newPost)
    if(createdPost) {
        let output: OutputPostModel = structuredClone(newPost)
        res.status(201).send(output)
    }
})
postRoute.get('/:id',async (req: Request, res: Response) => {
    const post = await PostRepository.getById(req.params.id)
    if(post) {
        res.status(200).send(post)
    }else{
        res.sendStatus(404)
    }
})
postRoute.put('/:id', authMiddleware, postValidation(), async (req: Request, res: Response) => {
    if(!ObjectId.isValid(req.params.id)){
        res.sendStatus(404)
        return;
    }
    const {title, shortDescription, content, blogId} = req.body
    const origin = await PostRepository.getById(req.params.id)
    if(!origin?.createdAt){
        res.sendStatus(404)
        return;
    }
    const updatedPost = {
        id: req.params.id,
        title,
        shortDescription,
        content,
        blogId,
        blogName: await BlogRepository.getNameById(blogId),
        createdAt: origin?.createdAt
    }
    const createdPost = await PostRepository.updatePost(req.params.id, updatedPost)
    if(createdPost){
        res.status(204).send(createdPost)
    }else {
        res.sendStatus(404)
    }
})
postRoute.delete('/:id', authMiddleware,async (req: Request, res: Response) => {
    const deletedPost = await PostRepository.deletePost(req.params.id)
    if(deletedPost){
        res.sendStatus(204)
    }
    res.sendStatus(404)
})
