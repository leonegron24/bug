import { Auth0Provider } from "@bcwdev/auth0provider";
import { trackedBugService } from "../services/TrackedBugService.js"
import BaseController from "../utils/BaseController.js"

export class TrackedBugController extends BaseController{
    constructor(){
        super('api/trackedbugs')
        this.router
        .use((request,response,next) => {
            console.log('Running Bug Middleware');
            next()
        })
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createTrackedBug)
        .delete('/:trackedBugId', this.deleteTrackedBug)
    }

    async createTrackedBug(request, response, next){
        try {
            const bugData = request.body
            const userInfo = request.userInfo
            bugData.creatorId = userInfo.id
            console.log('trackedBug user', bugData)
            const trackedBug = await trackedBugService.createTrackedBug(bugData) 
           response.send(trackedBug) 
        } catch (error) {
            next(error)
        }
    }

    async deleteTrackedBug(request, response, next){
        try {
            const bugData = request.body
            const trackedBugId = request.params.trackedBugId
            const userId = request.userInfo.id
            bugData.creatorId = userId
            const bugToDelete = await trackedBugService.deleteTrackedBug(trackedBugId, bugData)
            response.send(bugToDelete)
        } catch (error) {
            next(error)
        }
    }
}