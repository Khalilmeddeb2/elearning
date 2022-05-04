const mongoose = require('mongoose');

const ProfilSchema = new mongoose.Schema({
    //nom : String,
    user : { _id: {type : mongoose.Schema.Types.ObjectId, ref :'user'}, firstName: String, lastName: String, email: String, etablissement :String},
    originalname:String,
    filename:String,
   
});

const Profil = mongoose.model('Profil', ProfilSchema);
module.exports = Profil