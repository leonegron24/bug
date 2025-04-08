import { Schema } from "mongoose";
import { ValueSchema } from "./Value.js";

export const TrackedBugSchema = new Schema(
    {
        accountId: {type: Schema.ObjectId, required: true, ref: "Account"},
        bugId: {type: Schema.ObjectId, required: true, ref: "Bug"},
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

ValueSchema.virtual('tracker', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

ValueSchema.virtual('bug', {
    localField: 'bugId',
    foreignField: '_id',
    justOne: true,
    ref: 'Bug'
})