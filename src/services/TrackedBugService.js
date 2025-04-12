import { dbContext } from "../db/DbContext.js"

class TrackedBugService{

    async getUsersTrackingABug(bugId) {
        const tracked = await dbContext.TrackedBugs.find({ bugId }).populate('tracker')
        return tracked
      }
      
      

    async createTrackedBug(bugData) {
        const trackedBug = await dbContext.TrackedBugs.create(bugData)
        await trackedBug.populate('bug')
        await trackedBug.populate('tracker')
        return trackedBug
    }


    async getBugsYouAreTracking(userId) {
        const tracked = await dbContext.TrackedBugs.find({ accountId: userId }).populate('bug')
        return tracked
      }

    async deleteTrackedBug(trackedBugId, bugData) {
        const trackedBug = await dbContext.TrackedBugs.findById(trackedBugId)
    
        if (!trackedBug) {
            throw new Error('Tracked bug not found')
        }

        if (trackedBug.accountId.toString() !== bugData.creatorId) {
            throw new Error('You are not authorized to delete this tracked bug')
        }
        
        await trackedBug.deleteOne()
        return `${trackedBugId} was deleted!`
        }
      
      
}
export const trackedBugService = new TrackedBugService()