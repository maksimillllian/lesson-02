import {InsertBlogType, OutputBlogType} from "../models/blog/output/blog.output.models";
import {blogsCollection} from "../db/db";
import {blogMapper} from "../models/blog/mappers/blog-mappers";
import {ObjectId, WithId} from "mongodb";
import {InputBlogType} from "../models/blog/input/blog.input.models";



export class BlogRepository {
    static async getAll(): Promise<InsertBlogType[]> {
        const blogs = await blogsCollection.find({}).toArray();
        return blogs.map(blogMapper);
    }
    static async getById(id: string): Promise<InsertBlogType | null> {
        const blog = await blogsCollection.findOne({_id: new ObjectId(id)})
        if(!blog){
            return null;
        }
        return blogMapper(blog)

    }
    static async createBlog(createdData: WithId<OutputBlogType>): Promise<string> {
        const blog = await blogsCollection.insertOne(createdData)
        return blog.insertedId.toString()
    }


    static async updateBlog(id: string, updatedBlog: InputBlogType): Promise<boolean> {
        const blog = await blogsCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                name: updatedBlog.name,
                description: updatedBlog.description,
                websiteUrl: updatedBlog.websiteUrl
            }
        })
        return !!blog.matchedCount;
    }
    static async deleteBlog(id: string): Promise<boolean> {
        const blog = await blogsCollection.deleteOne({_id: new ObjectId(id)})

        return !!blog.deletedCount

    }
    static async getNameById(id: string): Promise<string>{
        const blog = await blogsCollection.findOne({id: id})
        return blog ? blog.name : 'wasNotFound'
    }

}