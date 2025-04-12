import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugService } from "../services/BugService.js";
import BaseController from "../utils/BaseController.js";
import { noteService } from "../services/NoteService.js";
import { trackedBugService } from "../services/TrackedBugService.js";

export class BugController extends BaseController{
    constructor(){
        super('api/bugs')
        this.router
        .get('/:bugId/trackedbugs', this.getUsersTrackingABug)
        .get('/:bugId/notes', this.getAllNotesByBugId)
        .get('', this.getAllBugs)
        .get('/:bugId', this.getBugById)
        .use((request,response,next) => {
            console.log('Running Bug Middleware');
            next()
        })
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createBug)
        .put('/:bugId', this.editBug)
        .delete('/:bugId', this.deleteBug)
    }

    async createBug(request, response, next){
        try {
            const bugData = request.body
            const userInfo = request.userInfo
            console.log(userInfo)
            bugData.creatorId = userInfo.id
            const createBug = await bugService.createBug(bugData)
            response.send(createBug)
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

    async getBugById(request, response, next){
        try {
            const bugId = request.params.bugId
            console.log('bugId: ', bugId)
            const bug = await bugService.getBugById(bugId)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async editBug(request, response, next){
        try {
            const bugData = request.body
            const bugId = request.params.bugId
            const bug = await bugService.editBug(bugData, bugId)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async deleteBug(request, response, next){
        try {
            const bugId = request.params.bugId
            const bug = await bugService.deleteBug(bugId)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async getAllNotesByBugId(request, response, next){
        try {
            const bugId = request.params.bugId
            console.log('request body: ', request.body)
            console.log(bugId)
            const notes = await noteService.getAllNotesByBugId(bugId)
            response.send(notes) 
        } catch (error) {
            next(error)
        }
    }

    async getUsersTrackingABug(request, response, next){
        try {
            const bugId = request.params.bugId
            const users = await trackedBugService.getUsersTrackingABug(bugId)
             response.send(users)
        } catch (error) {
            next(error)
        }
    }

}