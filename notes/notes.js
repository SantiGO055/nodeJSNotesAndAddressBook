var express = require("express");
var router = express.Router();
var notes = require("./notesDb");
var { addNotesDB, getAllNotes, getNoteByID } = require("../model/mongoose");

router.get("/", function (req, res, next) {
  // handle specific get/post/etc methods
  getAllNotes().then((notesAuxiliar) => {
    console.log("notesAuxiliar");
    res.header("Content-Type", "application/json");
    res.json(notesAuxiliar);
  });
});

router.delete("/:id", function (req, res, next) {
  try {
    let id = parseInt(req.params.id);
    // console.log(notes);

    console.log(id);
    if (id != null || id != NaN) {
      notes = notes.filter((not) => {
        console.log(not);

        return not.id !== id;
      });

      console.log(notes);
      if (notes != null) {
        res.json(notes);
      } else {
        let objError = {
          message: "Error, no se encuentra el recurso",
          status: 400
        };
        res.status(400).json(objError);
      }
    } else {
      let objError = {
        message: "El ID proporcionado no es correcto.",
        status: 400
      };
      res.status(400).json(objError);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
  // console.log(res);
});

router.get("/:id", function (req, res) {
  try {
    let id = parseInt(req.params.id);

    console.log(id);
    if (id != null || id != NaN) {
      getNoteByID(id).then((note) => {
        console.log("aux");
        // const note = notes.find((not) => not.id === id);
        if (note != null) {
          res.json(note);
        } else {
          let objError = {
            message: "Error, no se encuentra el recurso",
            status: 400
          };
          res.status(400).json(objError);
        }
      });
      // const note = notes.find((not) => not.id === id);
      // if (note != null) {
      //   res.json(note);
      // } else {
      //   let objError = {
      //     message: "Error, no se encuentra el recurso",
      //     status: 400
      //   };
      //   res.status(400).json(objError);
      // }
    } else {
      let objError = {
        message: "El ID proporcionado no es correcto.",
        status: 400
      };
      res.status(400).json(objError);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.post("/", (req, res) => {
  console.log(req.body);

  console.log(req.params);
  if (req.body != null) {
    var objAux = {
      id: notes.length + 1,
      content: req.body.content,
      date: new Date().toISOString(),
      important: req.body.important
    };
  }
  notes.push(objAux);
  addNotesDB(objAux);
  console.log(notes);
  res.send(objAux).status(200);
});

router.put("/changeImportance/:id", (req, res) => {
  let id = parseInt(req.params.id);

  let notaAux = notes.filter((n) => n.id === id);
  console.log("notaAux");
  console.log(notaAux);
  if (notaAux.length > 0 && notaAux != null) {
    const changedNote = { ...notaAux[0], important: !notaAux[0].important };
    console.log(changedNote);

    notes = notes.map((note) => (note.id !== id ? note : changedNote));

    res.send(changedNote);
  } else {
    let objError = {
      message: "Error, no se encuentra el recurso",
      status: 400
    };
    res.status(400).json(objError);
  }
});
module.exports = router;
