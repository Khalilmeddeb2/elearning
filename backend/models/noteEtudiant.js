const mongoose = require('mongoose');
//const Etablissement = require('./etablissement');

const noteEtudiantSchema = new mongoose.Schema({
    enseignant : { _id: {type : mongoose.Schema.Types.ObjectId, ref :'user'}, firstName: String, lastName: String, email: String, etablissement :{type : mongoose.Schema.Types.ObjectId, ref :'Etablissement'}},
    test:  {type : mongoose.Schema.Types.ObjectId, ref :'Test' },
    score :Number
});

const NoteEtudiant = mongoose.model('NoteEtudiant', noteEtudiantSchema);
module.exports = NoteEtudiant