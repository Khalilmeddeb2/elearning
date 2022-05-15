const config = require("./config.js").config;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.DB_URL.url;
db.users = require("../models/user.model.js")(mongoose);

module.exports = db;
