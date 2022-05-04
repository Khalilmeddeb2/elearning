const express = require("express");
var cors = require("cors");
const db = require("./config/db.config");

//app
const app = express();

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to elearning database!");
  })
  .catch((err) => {
    console.log("Cannot connect to elearning database!", err);
    process.exit();
  });

//Header settings
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, XMLHttpRequest"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//app
module.exports = app;
