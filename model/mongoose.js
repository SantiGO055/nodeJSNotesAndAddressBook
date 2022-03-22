var notes = require("../notes/notesDb");
const mongoose = require("mongoose");
const password = "santidatabase";
const url = `mongodb+srv://santigo:${password}@cluster0.h6zdp.mongodb.net/note-app?retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
  id: Number,
  content: String,
  date: String,
  important: Boolean
});
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Note = mongoose.model("Note", noteSchema);

const addNotesDB = (noteAdd) => {
  mongoose.connect(url);

  const noteDb = new Note({
    id: noteAdd.id,
    content: noteAdd.content,
    date: noteAdd.date,
    important: noteAdd.important
  });

  noteDb.save().then((result) => {
    console.log("note saved!");
    console.log(result);
    mongoose.connection.close();
  });
};
const getAllNotes = async () => {
  try {
    var auxNotes = [];
    mongoose.connect(url);
    await Note.find({}).then((result) => {
      auxNotes = [...result];
      // console.log(result);
      result.forEach((note) => {
        // console.log("nota de db");
        // console.log(note);
      });
      mongoose.connection.close();
    });

    return auxNotes;
  } catch (error) {
    console.log(error.message);
  }
};
const getNoteByID = async (idToSearch) => {
  try {
    var auxNote = {};
    mongoose.connect(url);
    await Note.find({ id: idToSearch }).then((result) => {
      auxNote = result;
      console.log(typeof result);
      mongoose.connection.close();
    });
    return auxNote;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { addNotesDB, getAllNotes, getNoteByID };
