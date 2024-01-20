import {db} from "../db/db";


type post = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export class PostRepository{
    static getAll(){
        return db.posts;
    }
    static getById(id: string){
        return db.posts.find((b) => b.id === id)

    }
    static createPost(post: post){
        db.posts.push(post);
        return post;
    }
    static deletePost(id: string) {
        const indexToRemove = db.posts.findIndex((p) => p.id === id);

        if (indexToRemove !== -1) {
            db.posts.splice(indexToRemove, 1);
            return 204;
        } else {
            return 404;
        }

    }

    static updatePost(post: post){
        const indexOfPost = db.posts.findIndex((p) => p.id === post.id);
        if(indexOfPost === -1){
            return 404
        }
        db.posts[indexOfPost] = post;
        return 204
    }
}