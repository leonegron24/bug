import { dbContext } from "../db/DbContext.js"

class BugService{
    
    async createBug(bugData) {
        const createBug = await dbContext.Bugs.create(bugData)
        await createBug.populate('creator')
        return createBug
    }
    
    async getAllBugs() {
        const bugs = await dbContext.Bugs.find()
        return bugs
    }

    async getBugById(bugId) {
        const bug = await dbContext.Bugs.findById(bugId).populate('bug').populate('creator')
        if (bug == null) throw new Error('Bug with this Id does not exist')
        return bug
    }

    async editBug(bugData, bugId) {
        const bug = await this.getBugById(bugId)
        await bug.updateOne(bugData)
        return bug
    }

    async deleteBug(bugId) {
        const bugToDelete = await this.getBugById(bugId)
        await bugToDelete.deleteOne()
        return `${bugId} was deleted!`
    }
    
}
export const bugService = new BugService()