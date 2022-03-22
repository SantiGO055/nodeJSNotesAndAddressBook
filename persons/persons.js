var express = require("express");
var router = express.Router();
var persons = require("./personsDb");

router.get("/", function (req, res, next) {
  res.header("Content-Type", "application/json");
  console.log(persons);
  // console.log(res);
  res.json(persons);
});

router.delete("/:id", function (req, res) {
  try {
    let id = parseInt(req.params.id);

    console.log(id);
    if (id != null || id != NaN) {
      persons = persons.filter((persona) => {
        console.log(persona);

        return persona.id !== id;
      });

      console.log(persons);
      if (persons != null) {
        res.json(persons);
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

router.get("/getPerson/:id", function (req, res) {
  try {
    let id = parseInt(req.params.id);
    console.log(id);
    if (id != null || id != NaN) {
      const persona = persons.find((persona) => persona.id === id);
      if (persona != null) {
        res.json(persona);
      } else {
        let objError = {
          message: "Error, no se encuentra la persona",
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
});

router.get("/getInfo", function (req, res) {
  let date = new Date().toISOString();
  let message = `Phonebook has info for ${persons.length} people <br><br> ${date}`;

  // console.log(res);
  res.send(message);
});

const checkIfNotNameExists = (name) => {
  return persons.find((person) => person.name === name) ? false : true;
};
router.post("/", (req, res) => {
  console.log(req.body);

  var randomId = Math.floor(
    Math.random() * (100 - persons.length) + persons.length
  );
  let noCreate = persons.filter((persona) => persona.id === randomId);
  console.log(noCreate.length);
  if (req.body.name) {
    if (checkIfNotNameExists(req.body.name)) {
      if (req.body.number) {
        if (noCreate.length === 0) {
          var objAux = {
            id: randomId,
            name: req.body.name,
            number: req.body.number
          };
          console.log(objAux);
          persons.push(objAux);
          res.status(200).json(objAux);
        } else {
          res.status(401).json({
            error: 401,
            message: "Ya existe una persona con mismo id"
          });
        }
      } else {
        res
          .status(401)
          .json({ error: 401, message: "Ingrese un numero por favor" });
      }
    } else {
      res.status(401).json({
        error: 401,
        message: `Ya existe una persona con el nombre ${req.body.name}`
      });
    }
  } else {
    res
      .status(401)
      .json({ error: 401, message: "Ingrese un nombre por favor" });
  }
});
module.exports = router;
