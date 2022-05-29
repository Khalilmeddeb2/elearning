const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    type : {type : String, required :true},
    selected : {
        type: Boolean,
        default: false,
      },
});

const Role = mongoose.model('Role',roleSchema);

module.exports = Role

// Performance vs coherance
// coherance: normalise
// author {}
// course { author_id : id}

// Performance : Embedded 
// course { author : { }}

// Hybrid 
//auhtor { }
// course { author : { id , name}}