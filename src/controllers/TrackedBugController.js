import BaseController from "../utils/BaseController.js"

export class TrackedBugController extends BaseController{
    constructor(){
        super('api/bugs')
        this.router
    }
}