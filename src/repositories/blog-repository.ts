import {db} from "../db/db";

type blog = {
    id: number,
    name: string,
    description: string,
    websiteUrl: string
}

export class BlogRepository{
    static getAll(){
        return db.blogs;
    }
    static getById(id: number){
        return db.blogs.find((b) => b.id === id)

    }
    static createBlog(blog: blog){
        db.blogs.push(blog);
        return blog;
    }
    static deleteBlog(id: number) {
        const indexToRemove = db.blogs.findIndex((b) => b.id === id);

        if (indexToRemove !== -1) {
            db.blogs.splice(indexToRemove, 1);
            return 204;
        } else {
            return 404;
        }

    }

    static updateBlog(blog: blog){
        const indexOfBlog = db.blogs.findIndex((b) => b.id === blog.id);
        if(indexOfBlog === -1){
            return 204
        }
        db.blogs[indexOfBlog] = blog;
        return 404
    }
}