module.exports = (mongoose) => {
  const User = mongoose.model(
    "user",
    mongoose.Schema({
      firstName: {
        type: String,
        trim: true,
        //required: true,
      },
      
      lastName: {
        type: String,
        trim: true,
      },
      
      email: {
        type: String,
        trim: true,
        lowercase: true,
        //required: true,
        unique : true,
      },
      password: {
        type: String,
        trim: true,
        //select: false,
        //required: true,
       
      },
      // j'ai ajouté 2 champs newpassword et Confirmpassword pour la changement de mot de passe dans le profil


      newpassword :{ type: String,},

      confirmpassword :{ type: String,},
      //
      phone: {
        type: String,
        trim: true,
      },
      status: {
        type: Boolean,
        default: false,
      },

    // 

      createdAt: {
        type: Date,
        default: Date.now(),
      },
         
   role:{type : mongoose.Schema.Types.ObjectId, ref :'Role'},

   etablissement:{type : mongoose.Schema.Types.ObjectId, ref :'Etablissement'},

   // utiliser pour module gestion des enseiganats 
   matiere:  [{type : mongoose.Schema.Types.ObjectId, ref :'Matiere'}],

   directeur : { _id: {type : mongoose.Schema.Types.ObjectId, ref :'user'}, firstName: String, lastName: String, email: String, etablissement :{type : mongoose.Schema.Types.ObjectId, ref :'Etablissement'}},
  
   // utiliser pour module gestion des etudiants 
   classe:{type : mongoose.Schema.Types.ObjectId, ref :'Classe'},

   selected : {
    type: Boolean,
    default: false,
  },

  etat : {type :String ,},

    originalname:String,
    filename:String,

    })
  );

  return User;
};
