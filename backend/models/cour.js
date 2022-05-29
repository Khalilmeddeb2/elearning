const mongoose = require('mongoose');

const courSchema = new mongoose.Schema({
    nom : String,
    enseignant : { _id: {type : mongoose.Schema.Types.ObjectId, ref :'user'}, firstName: String, lastName: String, email: String, etablissement :String},
    description :String,
    matiere :{type : mongoose.Schema.Types.ObjectId, ref :'Matiere'},
    classe:  [{type : mongoose.Schema.Types.ObjectId, ref :'Classe'}],
    originalname:String,
    filename:String,
    selected : {
        type: Boolean,
        default: false,
      },
      nbDownload : {
        type : Number,
        default : 0
      },
      nbVues : {
        type : Number,
        default : 0
      },
      date: {
        type : Date,
        
      },
     
});

const Cour = mongoose.model('Cour', courSchema);
module.exports = Cour