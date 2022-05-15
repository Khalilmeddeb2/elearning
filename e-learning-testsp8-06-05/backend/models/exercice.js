const mongoose = require('mongoose');
//const Etablissement = require('./etablissement');

const ExerciceSchema = new mongoose.Schema({
    nom :String ,
    titre :String,
    enseignant : { _id: {type : mongoose.Schema.Types.ObjectId, ref :'user'}, firstName: String, lastName: String, email: String, etablissement :String},
    matiere :{type : mongoose.Schema.Types.ObjectId, ref :'Matiere'},
    question:  [{type : mongoose.Schema.Types.ObjectId, ref :'Question'}],
    classe:  [{type : mongoose.Schema.Types.ObjectId, ref :'Classe'}],
    temps :Number,
    verif: {
        type: Boolean,
        default: false,
      },
    score : Number,  
});

const Exercice = mongoose.model('Exercice', ExerciceSchema);
module.exports = Exercice