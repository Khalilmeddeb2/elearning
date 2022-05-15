const mongoose = require('mongoose');
//const Etablissement = require('./etablissement');

const QuestionSchema = new mongoose.Schema({
    nom :String ,
    enseignant : { _id: {type : mongoose.Schema.Types.ObjectId, ref :'user'}, firstName: String, lastName: String, email: String, etablissement :String},
    matiere :{type : mongoose.Schema.Types.ObjectId, ref :'Matiere'},
    //classe:  [{type : mongoose.Schema.Types.ObjectId, ref :'Classe'}],
    question : String,
   
    choix:  [{numero:Number,text:String, selected : {
      type: Boolean,
      default: false,
    },}],
    answer : String ,
    selected : {
        type: Boolean,
        default: false,
      }, 
      ///nbEtudiants :Number 
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question