import {InsertPostModel, OutputPostModel, OutputPostModelAlpha} from "../models/posts/output";
import {blogsCollection, db, postsCollection} from "../db/db";
import {blogMapper} from "../models/blog/mappers/blog-mappers";
import {postMapper} from "../models/posts/postMapper";
import {ObjectId, WithId} from "mongodb";

export class PostRepository{
    static async getAll(){
        const posts = await postsCollection.find({}).toArray();
        return posts.map(postMapper);
    }
    static async getById(id: string){
        const post = await postsCollection.findOne({_id : new ObjectId()})
        if(!post){
            return null;
        }
        return postMapper(post)

    }
    static async createPost(post: WithId<OutputPostModel>){
        const createPost = await postsCollection.insertOne(post)
        return createPost.insertedId.toString()
    }
    static async deletePost(id: string) {
        const post = await postsCollection.deleteOne({_id: new ObjectId(id)})

        return !!post.deletedCount
    }

    static async updatePost(id: string,postInf: OutputPostModel){
        const updatePost = await postsCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                name: postInf.title,
                shortDescription: postInf.shortDescription,
                content: postInf.content,
                blogId: postInf.blogId,
                blogName: postInf.blogName
            }
        })
        return !!updatePost.matchedCount;
    }
}