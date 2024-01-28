import {Request, Response, Router} from "express";
import {blogsCollection, postsCollection} from "../db/db";
import {TestRepository} from "../repositories/test-repository";

export const testRoute = Router({})

testRoute.delete('/all-data', async (req: Request, res: Response) => {
    const IsDeleted = TestRepository.deleteAll()
    res.sendStatus(204);
})