const express = require("express");
const http = require('http');
const { Server } = require('socket.io');
var morgan = require("morgan");
const cors = require("cors");
//port at which the server will run
const WebSocket = require('ws');

var notesRoute = require("./notes/notes");
var personsRoute = require("./persons/persons");
var utils = require("./utils/utils");
const app = express();
// morgan.token("type", function (req, res) {
//   return req.headers["content-type"];
// });
// // app.use(cors);
// app.use(morgan("dev"));
// app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true }));

// app.use("/notes", notesRoute);
// app.use("/persons", personsRoute);
// app.use("/", utils);

const server = http.createServer(app);

//#region Implementacion con libreria ws
// const wss = new WebSocket.Server({server});
// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(data) {
//     wss.clients.forEach(function each(client) {
//       console.log(data)
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     })
//   })
// })
//#endregion



app.use(express.static('public'));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//#region Implementacion con socket.io
let connectedSocket = null;
const io = new Server(server);

io.on('connection', (socket) => {
  let arrAux = [];
  console.log('client connected');
  connectedSocket = socket;
    console.log("cliente")
    console.log(socket.client.id)

  
  const onMessage = (asd) => {
    arrAux.push(asd);
    console.log(arrAux)
    socket.broadcast.emit('message', asd)
    if (asd.message === 'ping') {
      // socket.send(arrAux);
    }
  }
  const onDisconnect = (reason) => {
    console.log('client disconnected: ', reason);
    connectedSocket = null;
    socket.off('message', onMessage);
    socket.off('error', onError);
  };
  const onError = (e) => {
    connectedSocket = null;
    socket.off('message', onMessage);
    socket.off('disconnect', onDisconnect);
  };
  socket.on('message', onMessage);
  socket.once('disconnect', onDisconnect);
  socket.once('error', onError);
});

//#endregion
const port = 5000;

// let messageRutaInexistente = {
//   message: "Ruta inexistente",
//   error: 404
// };

server.listen(port, () =>
  //a callback that will be called as soon as server start listening
  console.log(`server is listening at http://localhost:${port}`)
);
