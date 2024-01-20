import {db} from "../db/db";

type blog = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export class BlogRepository{
    static getAll(){
        return db.blogs;
    }
    static getById(id: string){
        return db.blogs.find((b) => b.id === id)

    }
    static createBlog(blog: blog){
        db.blogs.push(blog);
        return blog;
    }
    static deleteBlog(id: string) {
        const indexToRemove = db.blogs.findIndex((b) => b.id === id);

        if (indexToRemove !== -1) {
            db.blogs.splice(indexToRemove, 1);
            return 204;
        } else {
            return 404;
        }

    }

    static updateBlog(updatedBlog: blog): number {
        const indexOfBlog = db.blogs.findIndex((b) => b.id === updatedBlog.id);

        if (indexOfBlog !== -1) {
            db.blogs[indexOfBlog] = updatedBlog;
            return 204;
        } else {
            return 404;
        }
    }

}