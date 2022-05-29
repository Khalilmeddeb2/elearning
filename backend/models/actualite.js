const mongoose = require('mongoose');

const ActualiteSchema = new mongoose.Schema({
   
    titre :String,
    description :String,
    date :Date,
    originalname:String,
    filename:String,
   
});

const Actualite = mongoose.model('Actualite', ActualiteSchema);
module.exports = Actualite