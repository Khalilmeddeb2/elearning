const mongoose = require('mongoose');
//const Etablissement = require('./etablissement');

const classeSchema = new mongoose.Schema({
    nom : String,
    directeur : { _id: {type : mongoose.Schema.Types.ObjectId, ref :'user'}, firstName: String, lastName: String, email: String, etablissement :String},
    enseignant:  [{type : mongoose.Schema.Types.ObjectId, ref :'user' }],
    //etudiant:  [{type : mongoose.Schema.Types.ObjectId, ref :'user'}],
    //etudiants:  [{type : mongoose.Schema.Types.ObjectId, ref :'user'}],
    selected : {
        type: Boolean,
        default: false,
      },
      ///nbEtudiants :Number 
});

const Classe = mongoose.model('Classe', classeSchema);
module.exports = Classe