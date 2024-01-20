import {Router} from "express";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validators";
import {PostRepository} from "../repositories/post-repository";
import {Request, Response} from "express";

export const postRoute = Router({})

postRoute.get('/',(req, res) => {
    const posts = PostRepository.getAll()
    res.send(posts)
})
postRoute.post('/', authMiddleware, postValidation(),(req: Request, res: Response) => {
    const {title, shortDescription, content, blogId, blogName} = req.body
    const newPost = {
        id: String(new Date().getTime()),
        title,
        shortDescription,
        content,
        blogId,
        blogName
    }
    const createdPost = PostRepository.createPost(newPost)
    res.status(201).send(createdPost)

})
postRoute.get('/:id',(req: Request, res: Response) => {
    const post = PostRepository.getById(req.params.id)
    if(post) {
        res.status(200).send(post)
    }else{
        res.sendStatus(404)
    }
})
postRoute.put('/:id', authMiddleware, postValidation(),(req: Request, res: Response) => {
    const {title, shortDescription, content, blogId, blogName} = req.body
    const updatedPost = {
        id: req.params.id,
        title,
        shortDescription,
        content,
        blogId,
        blogName
    }
    const createdPost = PostRepository.updatePost(updatedPost)
    if(createdPost === 204){
        res.status(204).send(createdPost)
    }else {
        res.sendStatus(404)
    }
})
postRoute.delete('/:id', authMiddleware,(req: Request, res: Response) => {
    const deletedPost = PostRepository.deletePost(req.params.id)
    if(deletedPost === 204){
        res.sendStatus(204)
    }
    res.sendStatus(404)
})
