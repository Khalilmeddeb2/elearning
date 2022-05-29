var router = require("express").Router();
const _ = require('lodash');
const db = require("../config/db.config");
const User = db.users;
const Role = require('../models/role');
////const Etablissement =require('../models/etablissement')
const MD5 = require('md5');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Classe = require("../models/classe");


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


router.get('',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let idsSA = await Role.find({type : 'Etudiant'},'_id');
    console.log('idsSa :',idsSA);
    let users = await User.find({role:idsSA}).populate('classe')
    users.forEach(element => {
        console.log("element")
        console.log(element.directeur._id)

        if (req.userId  ==  element.directeur._id){
            console.log("vrai")
             //console.log(element.directeur.id)
            results.push(element)
            
        }
        else{
            console.log("false")
        }
       
    });
    res.send(results)
})



router.get('/toutesEtudiants',verifyToken,async (req,res)=>{
    
    let idsSA = await Role.find({type : 'Etudiant'});
    console.log('idsSa :',idsSA);
    let etudiants = await User.find({role:idsSA}).populate('classe')
  
       
  
    res.send(etudiants)
})
// recuperer la liste des etudiants pour un classe
router.get('/byClasse/:id_cls',verifyToken,async (req,res)=>{

    let idsSA = await Role.find({type : 'Etudiant'});
    console.log('idsSa :',idsSA);
    let etudiants = await User.find({classe : req.params.id_cls,role:idsSA}).populate('classe')
    res.send(etudiants)
})
//recuperer la listes des etudiants de cette enseiganat courant 
router.get('/numbersEtudiants/byClasse/:id_cls',verifyToken,async (req,res)=>{
    let nb =0;
    let idsSA = await Role.find({type : 'Etudiant'});
    console.log('idsSa :',idsSA);
    let etudiants = await User.find({classe : req.params.id_cls,role:idsSA}).populate('classe')
    nb=etudiants.length
    res.send((nb).toString());
})
// recuperer la listes des etudiants de cette enseiganat courant 
router.get('/ByEnseignant',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let idsSA = await Role.find({type : 'Etudiant'},'_id');
    console.log('idsSa :',idsSA);
    let users = await User.find({role:idsSA}).populate('classe')
    users.forEach(element => {
        //console.log("element",element)
        console.log(element.classe.enseignant[0]._id)
        element.classe.enseignant.forEach(e => {
            if (req.userId  ==  e._id){

            console.log("vrai")
             //console.log(element.directeur.id)
            results.push(element)
            
        }
        else{
            console.log("false")
        }
       
    });
    res.send(results)
})
})
// le nombre total des etudiants pour un directeur courant 
router.get('/numberEtudiants',verifyToken,async(req,res)=>{
    let results =[]
    let nb =0;
    let idsSA = await Role.find({type : 'Etudiant'},'_id');
    let users = await User.find({role:idsSA})
    users.forEach(element => {
        console.log("element")
        console.log(element.directeur._id)

        if (req.userId  ==  element.directeur._id){
            console.log("vrai")
             //console.log(element.directeur.id)
            results.push(element)
            nb=results.length
            console.log('nb',nb)
        }
        else{
            console.log("false")
        }
       
    });
    res.send((nb).toString());
    //res.send(results)
})  

router.get('/:id',verifyToken,async (req,res)=>{
    let user = await User.findById(req.params.id).populate('role').populate('directeur.etablissement').populate('classe');

    if(!user)
        return res.status(404).send('User Id is not found')
    res.send(user)
});

// add simple user 

router.post('',verifyToken,async (req,res)=>{
    //console.log( req.userId)
    let directeur = await User.findById(req.userId);
    if(!directeur)
        return res.status(404).send('directeur Id is not found')
    
    req.body.directeur = directeur
    //console.log(req.body.directeur)   
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10) 
    req.body.password=hashedPassword
    

    let user = await new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password','confirmpassword', 'phone','classe','directeur']))
    email=req.body.email
    try {
        user.status = true
        user.etat="Activé"  
        let idsSA = await Role.find({type : 'Etudiant'},'_id');
        //console.log('idsSa :',idsSA);
        let r=idsSA[0]
        user.role=r
        
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
            text: 'Bonjour '+ user.firstName + ', vous etes inscrit dans notre plateforme E-learning comme étant un Enseigant : '
            
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              //console.log('Email sent: ' + info.response);
            }
          });

    } catch (error) {
        return res.status(400).send("Error store in DB: "+error.message)
    }
    res.status(201).send(user)

   
});

// add director Etablissement 
/*
router.post('/Directeurs',async (req,res)=>{
    
   
*/



router.put('/:id',verifyToken,async (req,res)=>{
    
    let user = await User.findById(req.params.id);
    if(!user)
        return res.status(404).send('user Id is not found')
    
   
    //console.log(user) 
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

module.exports=router