//This file is for our model Headine object.

//Here's Mongoose again!
let mongoose = require("mongoose");

//Mongoose Schema SOP.
let Schema = mongoose.Schema;

//Make a new class for our headline schema.
let headlineSchema = new Schema
({
  //Headline: Required as a string.  Also includes index as a unique identifier.
  headline:
  {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  
  //Summary: Required as a string.  Some news sites (like New York Times) have article summaries separate from headlines.
  summary:
  {
    type: String,
    required: true
  },

  //url/URL: Required as a string.
  url:
  {
    type: String,
    required: true
  },

  //Date: A string normally comprised of the time of the article's fetching.
  date:
  {
    type: Date,
    default: Date.now
  },

  //Saved: An optional bool.  This is normally false since we assume most articles to the user aren't worth saving.
  saved:
  {
    type: Boolean,
    default: false
  }
});

//Make a Mongoose model from the Headline Schema.
let Headline = mongoose.model("Headline", headlineSchema);

//Export Headline for use in the rest of this project.
module.exports = Headline;