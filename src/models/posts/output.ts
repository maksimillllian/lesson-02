import {ObjectId} from "mongodb";

export type OutputPostModel = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}
export type OutputPostModelAlpha = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
    createdAt: string
}
export type InsertPostModel = {
    _id: ObjectId,
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}