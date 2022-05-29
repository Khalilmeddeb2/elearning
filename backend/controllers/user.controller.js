const db = require("../config/db.config");
const User = db.users;

exports.createUser = (objToSave) =>
  new Promise((resolve, reject) => {
    new User(objToSave)
      .save()
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });

exports.updateUser = (criteria, dataToSet, options) =>
  new Promise((resolve, reject) => {
    options.lean = true;
    options.new = true;
    User.findOneAndUpdate(criteria, dataToSet, options)
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });

exports.getUsers = (criteria) =>
  new Promise((resolve, reject) => {
    User.find(criteria)
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });

exports.findOne = (req, res) => {
  User.findOne({ email: req })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving one.",
      });
    });
};

exports.deleteUser = (criteria) =>
  new Promise((resolve, reject) => {
    User.findOneAndRemove(criteria)
      .exec()
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
