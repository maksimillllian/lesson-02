import dotenv from "dotenv"
import {MongoClient, WithId} from "mongodb";
import {BlogDBType, PostDBType} from "../models/db/blog-db";

dotenv.config()
export const port = 3000
export const db = {
    blogs: [],
    posts: []
}

const uri = process.env.MONGO_URL || "mongodb+srv://maks:SVDyWlmOBmGx8DQ1@cluster0.kjradp8.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri)

export const database = client.db("blogs-hws")

export const blogsCollection = database.collection<BlogDBType>(`blogs`)
export const postsCollection = database.collection<PostDBType>('posts')

export const runDb = async () => {
    try {
        await client.connect()
        console.log('Client connected to DB')
        console.log(`Example app listen on port ${port}`)
    }catch (e){
        console.log(e)
        await client.close()
    }
}
