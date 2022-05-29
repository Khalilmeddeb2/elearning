const mongoose = require('mongoose');

const ProfilEnfantSchema = new mongoose.Schema({
    //nom : String,
    enseignant : { _id: {type : mongoose.Schema.Types.ObjectId, ref :'user'}, firstName: String, lastName: String, email: String, etablissement :String},

    enfant :{type : mongoose.Schema.Types.ObjectId, ref :'Enfant'},
    description :String,
    date :Date,
    originalname:String,
    filename:String,
   
});

const ProfilEnfant = mongoose.model('ProfilEnfant', ProfilEnfantSchema);
module.exports = ProfilEnfant