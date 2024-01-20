import {db} from "../db/db";


type post = {
    id: number,
    title: string,
    shortDescription: string,
    content: string
}

export class PostRepository{
    static getAll(){
        return db.posts;
    }
    static getById(id: number){
        return db.posts.find((b) => b.id === id)

    }
    static createPost(post: post){
        db.posts.push(post);
        return post;
    }
    static deletePost(id: number) {
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
            return 204
        }
        db.posts[indexOfPost] = post;
        return 404
    }
}