//This file is for our model Note object.

//Like with all schema files, we require Mongoose.  That animal is popular around here!
let mongoose = require("mongoose");

//Mongoose Schema SOP.
let Schema = mongoose.Schema;

//Make a new class for our note schema.
let noteSchema = new Schema
({
  //NOTE: This code handles the note's association with a news article headline.
  _headlineId:
  {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },
  
  //Date: A string normally comprised of the time of the note's creation.
  date:
  {
    type: Date,
    default: Date.now
  },

  //noteText/NoteText: The textual contents of the note in string form.
  noteText: String
});

//Make a Mongoose model from the Note Schema.
let Note = mongoose.model("Note", noteSchema);

//Export Note for use in the rest of this project.
module.exports = Note;