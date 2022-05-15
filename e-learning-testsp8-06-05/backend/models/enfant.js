const mongoose = require('mongoose');
const Etablissement = require('./etablissement');

const enfantSchema = new mongoose.Schema({
    directeur : { _id: {type : mongoose.Schema.Types.ObjectId, ref :'user'}, firstName: String, lastName: String, email: String, etablissement :{type : mongoose.Schema.Types.ObjectId, ref :'Etablissement'}},
    nom :String,
    prenom :String,
    dateNaissance :Date,
    adresse :String,
    classe:{type : mongoose.Schema.Types.ObjectId, ref :'Classe'},
    selected : {
        type: Boolean,
        default: false,
      },
});

const Enfant = mongoose.model('Enfant', enfantSchema);
module.exports = Enfant