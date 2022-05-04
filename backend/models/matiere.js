const mongoose = require('mongoose');
const Etablissement = require('./etablissement');

const matiereSchema = new mongoose.Schema({
    nom : String,
    directeur : { _id: {type : mongoose.Schema.Types.ObjectId, ref :'user'}, firstName: String, lastName: String, email: String, etablissement :{type : mongoose.Schema.Types.ObjectId, ref :'Etablissement'}},
    selected : {
        type: Boolean,
        default: false,
      },
});

const Matiere = mongoose.model('Matiere', matiereSchema);
module.exports = Matiere