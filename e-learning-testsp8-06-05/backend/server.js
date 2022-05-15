const http = require("http");
var https = require("https");
const app = require("./app");
const express = require("express");
const cors = require("cors");

//les routes

const role_router = require('./routes/roles')
const etablissement_router = require('./routes/etablissements')
const matiere_router = require('./routes/matieres')
const enseignant_router = require('./routes/enseignants')
const classe_router = require('./routes/classes')
const cour_router = require('./routes/cours')
const etudiant_router = require('./routes/etudiants')
const exercice_router = require('./routes/exercices')
const question_router = require('./routes/questions')
const profil_router = require('./routes/profils')
const test_router = require('./routes/tests')
const noteEtudiant_router =require('./routes/notesEtudiants')

// créche
const enfant_router =require('./routes/enfants')
const profilEnfant_router =require('./routes/profilsEnfants')

//
const multer = require('multer')

require("./routes/user.routes")(app);



const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3007");
app.set("port", port);
// les apis 
app.use('/api/roles',role_router);
app.use('/api/etablissements',etablissement_router);
app.use('/api/matieres',matiere_router);
app.use('/api/enseignants',enseignant_router);
app.use('/api/classes',classe_router);
app.use('/api/cours',cour_router);
app.use('/api/etudiants',etudiant_router);
app.use('/api/exercices', exercice_router);
app.use('/api/questions', question_router);
app.use('/api/profils', profil_router);
app.use('/api/tests', test_router);
app.use('/api/notes', noteEtudiant_router)

//créche
app.use('/api/enfants', enfant_router)
app.use('/api/profilsEnfants', profilEnfant_router)



//const profil_router = require('./routes/profils')

app.use(express.json())
//
app.use(express.static("uploads"))
app.use(express.static("photos"))
//
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
