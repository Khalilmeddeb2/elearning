const mongoose = require('mongoose');
//const Etablissement = require('./etablissement');

const TestSchema = new mongoose.Schema({
    nom :String ,
    titre :String,
    enseignant : { _id: {type : mongoose.Schema.Types.ObjectId, ref :'user'}, firstName: String, lastName: String, email: String, etablissement :String},
    matiere :{type : mongoose.Schema.Types.ObjectId, ref :'Matiere'},
    question:  [{type : mongoose.Schema.Types.ObjectId, ref :'Question'}],
    classe:  [{type : mongoose.Schema.Types.ObjectId, ref :'Classe'}],
    verif: {
        type: Boolean,
        default: false,
      },
    
    dateDebut :Date,
    dateFin : Date ,
    temps :Number, 
    publie: {
      type: Boolean,
      default: false,
    }, 
});

const Test = mongoose.model('Test', TestSchema);
module.exports = Test