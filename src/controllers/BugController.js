import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugService } from "../services/BugService.js";
import BaseController from "../utils/BaseController.js";

export class BugController extends BaseController{
    constructor(){
        super('api/bugs')
        this.router
        .get('', this.getAllBugs)
        .use((request,response,next) => {
            console.log('Running Middleware');
            next()
        })
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createBug)
    }

    async createBug(request, response, next){
        try {
            const bug = request.body
            const userInfo = request.userInfo
            console.log(userInfo)
            bug.creatorId = userInfo.id
            const createBug = await bugService.createBug(bug)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async getAllBugs(request, response, next){
        try {
            const bugs = await bugService.getAllBugs()
            response.send(bugs)
        } catch (error) {
            next(error)
        }
    }

}