import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'
import { BugSchema } from '../models/Bug.js';
import { NoteSchema } from '../models/Note.js';
import { TrackedBugSchema } from '../models/TrackedBug.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bug', BugSchema);
  Notes = mongoose.model('Note', NoteSchema);
  TrackedBugs = mongoose.model('TrackedBug', TrackedBugSchema);
}

export const dbContext = new DbContext()
