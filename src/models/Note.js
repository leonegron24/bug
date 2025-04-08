import { Schema } from "mongoose";
import { ValueSchema } from "./Value.js";

export const NoteSchema = new Schema(
    {
        body: {type: String, min: 5, max: 500, required: true},
        bugId: {type: Schema.ObjectId, required: true, ref: 'Bug'},
        creatorId: {type: Schema.ObjectId, required: true, ref: 'Account'}
    }, 
    { timestamps: true, toJSON: {virtuals: true} }
)

ValueSchema.virtual('bug', {
    localField: 'bugId',
    foreignField: '_id',
    justOne: true,
    ref: 'Bug'
})

ValueSchema.virtual('creator', {
    localField: 'creator',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})