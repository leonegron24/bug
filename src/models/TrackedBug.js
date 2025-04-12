import { Schema } from "mongoose";


export const TrackedBugSchema = new Schema(
    {
        accountId: {type: Schema.ObjectId, required: true, ref: "Account"},
        bugId: {type: Schema.ObjectId, required: true, ref: "Bug"},
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

TrackedBugSchema.virtual('tracker', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TrackedBugSchema.virtual('bug', {
    localField: 'bugId',
    foreignField: '_id',
    justOne: true,
    ref: 'Bug'
})