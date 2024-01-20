import {Router} from "express";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validators";
import {BlogRepository} from "../repositories/blog-repository";
import {Request, Response} from "express";

export const blogRoute = Router({})

blogRoute.get('/',(req, res) => {
    const blogs = BlogRepository.getAll()
    res.send(blogs)
})
blogRoute.post('/', authMiddleware, blogValidation(),(req: Request, res: Response) => {
    const {name, description, websiteUrl} = req.body
    const newBlog = {
        id: +(new Date()),
        name,
        description,
        websiteUrl
    }
    const createdBlog = BlogRepository.createBlog(newBlog)
    res.send(createdBlog)

})
blogRoute.get('/:id',(req: Request, res: Response) => {
    const blog = BlogRepository.getById(+req.params.id)
    if(blog) {
        res.status(200).send(blog)
    }else{
        res.sendStatus(404)
    }
})
blogRoute.put('/:id', authMiddleware, blogValidation(),(req: Request, res: Response) => {
    const {name, description, websiteUrl} = req.body
    const updatedBlog = {
        id: +req.params.id,
        name,
        description,
        websiteUrl
    }
    const createdBlog = BlogRepository.updateBlog(updatedBlog)
    if(createdBlog === 204){
        res.status(204).send(createdBlog)
    }
    res.sendStatus(404)
})
blogRoute.delete('/:id', authMiddleware,(req: Request, res: Response) => {
    const deletedBlog = BlogRepository.deleteBlog(+req.params.id)
    if(deletedBlog === 204){
        res.sendStatus(204)
    }
    res.sendStatus(404)
})
