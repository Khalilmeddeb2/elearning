const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    //nom : String,
    user : { _id: {type : mongoose.Schema.Types.ObjectId, ref :'user'}, firstName: String, lastName: String, email: String, etablissement :String},
    message :String ,
    date : Date,
   
});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification