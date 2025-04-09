import { dbContext } from "../db/DbContext.js"

class BugService{

    async createBug(bug) {
        const createBug = await dbContext.Bugs.create(bug)
        return createBug
    }

    async getAllBugs() {
        const bugs = await dbContext.Bugs.find()
        return bugs
    }

}
export const bugService = new BugService()