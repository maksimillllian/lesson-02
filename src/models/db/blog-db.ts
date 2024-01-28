import {WithId} from "mongodb";

export type BlogDBType = WithId<{
    name: string
    description: string
    websiteUrl: string
    isMembership: boolean
    createdAt: string
}>
export type BlogDBTypeEx = WithId<{
    id: string
    name: string
    description: string
    websiteUrl: string
    isMembership: boolean
    createdAt: string
}>

export type PostDBType = WithId<{
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}>