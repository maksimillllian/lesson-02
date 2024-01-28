import {WithId} from "mongodb";
import {BlogDBType, BlogDBTypeEx, PostDBType} from "../../db/blog-db";
import {InsertBlogType, OutputBlogType} from "../output/blog.output.models";
import {OutputPostModel} from "../../posts/output";


export const blogMapper = (blog: WithId<BlogDBType>): InsertBlogType => {
    const { _id, name, description, websiteUrl, isMembership, createdAt } = blog;
    return {
        id: _id.toString(),
        name,
        description,
        websiteUrl,
        isMembership,
        createdAt
    };
};
