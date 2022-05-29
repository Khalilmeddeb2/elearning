const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    //nom : String,
    userEnvoie :{ _id: {type : mongoose.Schema.Types.ObjectId, ref :'user'}, firstName: String, lastName: String, email: String, etablissement :String},
    userReception :String,
    message :String ,
    date : Date,
    selected : {
        type: Boolean,
        default: false,
      },

    classeReception :[{type : mongoose.Schema.Types.ObjectId, ref :'Classe'}],
   
});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification