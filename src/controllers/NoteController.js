import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js"
import { noteService } from "../services/NoteService.js";

export class NoteController extends BaseController{
    constructor(){
        super('api/notes')
        this.router
        .use((request,response,next) => {
            console.log('Running Note Middleware');
            next()
        })
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createNote)
        .delete('/:noteId', this.deleteNote)
    }

        async createNote(request, response, next){
            try {
                const noteData = request.body
                const userInfo = request.userInfo
                noteData.creatorId = userInfo.id
                console.log('Note Data: ', noteData)
                const createNote = await noteService.createNote(noteData)
                response.send(createNote)
            } catch (error) {
                next(error)
            }
        }

        async deleteNote(request, response, next){
            try {
                const noteData = request.body
                const noteId = request.params.noteId
                console.log('Note To Delete: ', noteId)
                const userInfo = request.userInfo.id
                noteData.creatorId = userInfo
                const noteToDelete = await noteService.deleteNote(noteId,noteData)
                response.send(noteToDelete)
            } catch (error) {
                next(error)
            }
        }

}