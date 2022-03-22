const express = require("express");
var morgan = require("morgan");
const cors = require("cors");
//port at which the server will run

var notesRoute = require("./notes/notes");
var personsRoute = require("./persons/persons");
var utils = require("./utils/utils");
const app = express();
morgan.token("type", function (req, res) {
  return req.headers["content-type"];
});

// app.use(cors);
app.use(morgan("dev"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use("/notes", notesRoute);
app.use("/persons", personsRoute);
app.use("/", utils);

const port = 5000;

let messageRutaInexistente = {
  message: "Ruta inexistente",
  error: 404
};

app.get("*", function (req, res) {
  res.status(404).json(messageRutaInexistente);
  res.redirect("/");
});
app.post("*", function (req, res) {
  res.status(404).json(messageRutaInexistente);
  res.redirect("/");
});
app.listen(port, () =>
  //a callback that will be called as soon as server start listening
  console.log(`server is listening at http://localhost:${port}`)
);
