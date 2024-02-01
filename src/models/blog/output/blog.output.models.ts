import {ObjectId, WithId} from "mongodb";

export type OutputBlogType = WithId<{
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
    _id?: ObjectId
}>
export type InsertBlogType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
    _id?: ObjectId
 }
export type OutputBlogGetType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}
export type OutputBlogPostType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}
export type OutputBlogPutType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}
export type OutputBlogDeleteType = {
    isDeleted: boolean
}