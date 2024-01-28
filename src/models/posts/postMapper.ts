import {WithId} from "mongodb";
import {PostDBType} from "../db/blog-db";
import {OutputPostModel} from "./output";


export const postMapper = (post: WithId<PostDBType>): OutputPostModel => {
    const { _id, title, shortDescription, content, blogId, blogName, createdAt } = post;
    return {
        id: _id.toString(),
        title,
        shortDescription,
        content,
        blogId,
        blogName,
        createdAt
    };
};
