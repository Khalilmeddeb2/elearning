const mongoose = require('mongoose');

const etablissementSchema = new mongoose.Schema({
    firstName : {type :String, required : true},
    numeroRegister :String,
    pays :String,
    adresse :String,
    telephoneFixe :String,
    siteWeb :String,
    type :String,
    status: {
        type: Boolean,
        default: false,
      },
    role:  [{type : mongoose.Schema.Types.ObjectId, ref :'Role'}],
    etat : {type :String },
    url : String,

});

const Etablissement = mongoose.model('Etablissement',etablissementSchema);

module.exports = Etablissement