import { dbContext } from "../db/DbContext.js"

class NoteService{

    async createNote(noteData) {
        const createNote = await dbContext.Notes.create(noteData)
        await createNote.populate('creator')
        return createNote
    }
    
    async getAllNotesByBugId(bugId) {
        const notes = await dbContext.Notes.find({ bugId }).populate('creator')
        return notes
      }
    
    async deleteNote(noteId,noteData) {
        const note = await dbContext.Notes.findById(noteId)
        if(note == null) throw new Error('Note with this Id does not exist!')
        if (note.creatorId.toString() !== noteData.creatorId) {
            throw new Error('You are not authorized to delete this note')
            }
        await note.deleteOne()
        return `${noteId} was deleted!`
    }  

}
export const noteService = new NoteService()