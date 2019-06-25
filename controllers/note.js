//This file handles the controller for our notes!
let db = require("../models");

module.exports =
{
  //Find one note.  Microsoft's involvement is optional.
  find: function(req, res)
  {
    db.Note.find({ _headlineId: req.params.id }).then(function(dbNote)
    {
      res.json(dbNote);
    });
  },
  
  //Make a new note!
  create: function(req, res)
  {
    db.Note.create(req.body).then(function(dbNote) {
      res.json(dbNote);
    });
  },

  //Nix a note by ID.
  delete: function(req, res)
  {
    db.Note.remove({ _id: req.params.id }).then(function(dbNote)
    {
      res.json(dbNote);
    });
  }
};
