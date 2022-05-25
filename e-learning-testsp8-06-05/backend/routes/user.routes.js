module.exports = app => {
    const authService = require("../services/user.service");

    var router = require("express").Router();

    /* User Registration. */
    router.post("/register", authService.register);

    /* User login. */
    router.post("/login", authService.login);

    app.use('/api/user', router);

    //const router=require('express').Router();
const _ = require('lodash');
const db = require("../config/db.config");
const User = db.users;
const Role = require('../models/role');
const Etablissement =require('../models/etablissement')
const MD5 = require('md5');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
//uplload

var path = require('path')
var multer = require('multer')
const crypto =require('crypto')
var storage = multer.diskStorage({
  destination: './photos/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage })

function verifyToken(req, res, next)
{
    if( !req.headers.authorization)
    {
        console.log('Oh nooo !! ')
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    console.log('token')
    console.log(token)
    if (token === ('null'))
    {
        return res.status(401).send('Unauthorized request')   
    }

    let payload = jwt.verify(token, 'secretkey')
    console.log("payload")
    console.log(payload)
    if (!payload)
    {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    console.log('payload')
    console.log(payload.subject)
    
    console.log('yesss')
    next()

    console.log('ID est :', req.userId)

    
}

/*router.get('',verifyToken,async (req,res)=>{
  
    res.send(await User.find({ role: { $ne: "620b5f307ef67b627a7b7fe4"} }).find({role :"621373e087ad5efa5f4ddac3"}).populate('role').populate('etablissement'));
});*/

router.get('',verifyToken,async (req,res)=>{
  //req Role by type to take the id
  let idsSA = await Role.find({type : 'SuperAdmin'},'_id');
  console.log('idsSa :',idsSA);
  let users = await User.find({ role: { $nin: idsSA} }).populate('role').populate('etablissement').populate('directeur.etablissement');
  users.forEach(element => {
    if(!element.etablissement)
      element.etablissement=element.directeur.etablissement;
  });

    res.send(users);
});

router.get('/numberDirecteurs',verifyToken,async (req,res)=>{
    let idsSA = await Role.find({type : 'Directeur'},'_id');
    console.log('idsSa :',idsSA);
    let directeurs = await User.find({role:idsSA})
    
    nb=directeurs.length
    console.log(nb)
    res.send((nb).toString());
  
    //res.send(directeurs)
  })

  router.get('/numberUtlisateurs',verifyToken,async (req,res)=>{
    let idsSA = await Role.find({type : 'Directeur'},'_id');
    console.log('idsSa :',idsSA);
    let users = await User.find({ role: { $nin:idsSA } })
    
    nb=users.length
    console.log(nb)
    res.send((nb).toString());
  
    //res.send(directeurs)
  })
/*
  router.get('/Directeurs',async (req,res)=>{
    let directeurs = await User.find({'role':'61f7dc8ad1ce5015c5d224c8'})
    
   
    res.send(directeurs);  
  
    //res.send(directeurs)
  })
*/
router.get('/:id',verifyToken,async (req,res)=>{
    let user = await User.findById(req.params.id).populate('role').populate('etablissement');
    if(!user)
        return res.status(404).send('User Id is not found')
    if(!user.etablissement)
    user.etablissement = await Etablissement.findById(user.directeur.etablissement);    
    res.send(user)

});

// add simple user 

router.post('',verifyToken,async (req,res)=>{
    let roleEntrante = await Role.findById(req.body.role);
    if(!roleEntrante){
        return res.status(404).send('role Id is not found')}

    let etablissementEntrante = await Etablissement.findById(req.body.etablissement);
    if(!etablissementEntrante){
        return res.status(404).send('etablissement Id is not found')}
   
    const hashedPassword = await bcrypt.hash(req.body.password, 10) 
    req.body.password=hashedPassword
    req.body.role=roleEntrante
    req.body.etablissement=etablissementEntrante
    let user = await new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password','confirmpassword','phone','role','etablissement']))
    email=req.body.email
    try {
        user.status = true
        user.etat="Activé"  
        user = await user.save()
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'erpglsia@gmail.com',
              pass: 'Tekup2020'
            }
          });
          var mailOptions = {
            from: 'erpglsia@gmail.com',
            to: email,
            subject: 'Bienvenu chez E-Learning',
            text: 'Bonjour '+ user.firstName + ', vous etes inscrit dans notre plateforme E-learning comme étant un  : '
            + user.role.type
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

    } catch (error) {
        return res.status(400).send("Error store in DB: "+error.message)
    }
    res.status(201).send(user)

   
});


router.put('/:id',verifyToken,async (req,res)=>{
    let user = await User.findById(req.params.id);
    if(!user)
        return res.status(404).send('user Id is not found')
    
    /*let role = await Role.findById(req.body.role);
    if(!role){
        return res.status(404).send('role Id is not found')}
  */
    console.log(user) 
    //let newPass = user.password
    if(req.body.password == "")
    {
        req.body.password = user.password
    }
    else
    {
        let hashedPassword = await bcrypt.hash(req.body.password, 10) 
        req.body.password=hashedPassword  
    }
   
   
        user.role =req.body.role;
        user=_.merge(user,req.body)
        user = await user.save();  
        res.send(user)
})


router.delete('/:id',verifyToken,async (req,res)=>{
    let user = await User.findByIdAndDelete(req.params.id);
    if(!user)
        return res.status(404).send('user Id is not found')
    res.send(user)
})


router.get('/:id/status', verifyToken,async (req,res)=>{
  let user = await User.findById(req.params.id);
  if(!user)
      return res.status(404).send('user Id is not found')
                              
  if(user.status == true)
  {

      user.status=false
      user.etat="Desactivé"
  }   
  else
  {
      user.status=true
      user.etat="Activé"  
  }      
      user = await user.save();   
  res.send(user)
})

//

// router.post('/imageProfile',verifyToken,upload.single('image'),async (req,res)=>{
//   console.log(req.body)
  
 
//   let userPropreites= _.pick(req.body,['firstName','email'])
//  // console.log(req.file)
//  userPropreites.filename=req.file.filename
//  userPropreites.originalname=req.file.originalname
//   let user = await new User(userPropreites)
  
  
//   try {
//     user = await user.save()
//   } catch (error) {
//       return res.status(400).send("Error store in database: "+error.message)
//   }
//   res.status(201).send(user)
// })

router.put('/:id/updatePassowrd',verifyToken,async (req,res)=>{
  let user = await User.findById(req.params.id);
  if(!user)
      return res.status(404).send('user Id is not found')
  
  /*let role = await Role.findById(req.body.role);
  if(!role){
      return res.status(404).send('role Id is not found')}
*/
  console.log(user) 
  //let newPass = user.password
  // if(req.body.password == "")
  // {
  //     req.body.password = user.password
  // }
  // else
  // {
  //     let hashedPassword = await bcrypt.hash(req.body.password, 10) 
  //     req.body.password=hashedPassword  
  // }
  
  
  let compare = await bcrypt.compare(req.body.password, user.password)
  if(!compare)
  {
      console.log('Mot de passse invalide ')
      res.status(401).send('Mot de passse invalide')
  }

  else{
    console.log("valid")
     let hashedPassword = await bcrypt.hash(req.body.newpassword, 10) 
   // let hashedPassword2 = await bcrypt.hash(req.body.confirmpassword, 10) 
    // let compare2 = await bcrypt.compare(req.body.newpassword, req.body.confirmpassword)
      //   if(!compare2)
      //  {
      //   console.log('erooor ')
      //   res.status(401).send('mot de passes ne sont pas corects')
      //  }
  
      //   else 
      //    { 

      if(req.body.newpassword == req.body.confirmpassword)
      {
  
          req.body.password=hashedPassword 
    
      user=_.merge(user,req.body)
      user = await user.save();  
      res.send(user)
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'erpglsia@gmail.com',
          pass: 'Tekup2020'
        }
      });
      let mailoptions = {
        from : 'erpglsia@gmail.com',
        to : user.email,
        subject : 'Fwd : Changement du mot passe',
        text :'Bonjour'+' '+ user.firstName +' '+ user.lastName + 
        ', BrainNut vous informe que vous venez de modifier votre mot de passe.'
    };
    
    transporter.sendMail(mailoptions, (err, data)=>{
        if (err)
        console.log('Mail error')
        console.log('Email sent !!!!')
    });
        //  }
       }
       else
         {
          res.status(401).send('Le mot de passe et la confirmation du mot de passe ne sont pas les memes')
         }
      }  
    })


};