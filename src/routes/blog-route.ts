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
    const {name, discription, websiteUrl} = req.body
    const newBlog = {
        id: +(new Date()),
        name,
        discription,
        websiteUrl
    }
    const createdBlog = BlogRepository.getAll()
    res.send(createdBlog)

})