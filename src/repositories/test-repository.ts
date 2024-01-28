import {blogsCollection, postsCollection} from "../db/db";

export class TestRepository {
    static async deleteAll(): Promise<boolean> {
        try {
            await blogsCollection.deleteMany({})
            await postsCollection.deleteMany({})
            return true;
        }catch {
            return false;
        }

    }

}