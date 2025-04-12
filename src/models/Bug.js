import { Schema } from "mongoose";

export const BugSchema = new Schema(
    {
        title: {type: String, min: 10, max: 50, required: true},
        description: {type: String, min: 10, max: 500, required: true},
        priority: {type: Number, min: 1, max: 5, required: true},
        closed: {type: Boolean, required: true, default: false},
        closedDate: {type: Date},
        creatorId: {type: Schema.ObjectId, ref:'Account', required: true},
    },
    { timestamps: true, toJSON: { virtuals: true } }
  )

  BugSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
  })