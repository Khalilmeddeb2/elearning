var router = require("express").Router();
const _ = require('lodash');
const db = require("../config/db.config");
const User = db.users;
//const Role = require('../models/role');
////const Etablissement =require('../models/etablissement')
//const MD5 = require('md5');
//const nodemailer = require('nodemailer');
//const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
//const Classe = require("../models/classe");
const Enfant=require("../models/enfant")

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
    //let idsSA = await Role.find({type : 'Etudiant'},'_id');
    //console.log('idsSa :',idsSA);
    let enfants = await Enfant.find().populate('classe').populate('parent')
    enfants.forEach(element => {
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

// afficher la les photos des enfants pour ses parents
router.get('/byParent/:idPar',verifyToken,async (req,res)=>{
    let enfants = await Enfant.find({parent :req.params.idPar}).populate('classe')
    
    res.send(enfants)
})

// recuperer la liste des enfants pour un classe
router.get('/byClasse/:id_cls',verifyToken,async (req,res)=>{

    let enfants = await Enfant.find({classe : req.params.id_cls}).populate('classe')
    res.send(enfants)
})

// router.get('/toutesEtudiants',verifyToken,async (req,res)=>{
    
//     let idsSA = await Role.find({type : 'Etudiant'});
//     console.log('idsSa :',idsSA);
//     let etudiants = await User.find({role:idsSA}).populate('classe')
  
       
  
//     res.send(etudiants)
// })
// recuperer la liste des etudiants pour un classe
// router.get('/byClasse/:id_cls',verifyToken,async (req,res)=>{

//     let idsSA = await Role.find({type : 'Etudiant'});
//     console.log('idsSa :',idsSA);
//     let etudiants = await User.find({classe : req.params.id_cls,role:idsSA}).populate('classe')
//     res.send(etudiants)
// })
// //recuperer la listes des etudiants de cette enseiganat courant 
// router.get('/numbersEtudiants/byClasse/:id_cls',verifyToken,async (req,res)=>{
//     let nb =0;
//     let idsSA = await Role.find({type : 'Etudiant'});
//     console.log('idsSa :',idsSA);
//     let etudiants = await User.find({classe : req.params.id_cls,role:idsSA}).populate('classe')
//     nb=etudiants.length
//     res.send((nb).toString());
// })
// recuperer la listes des enfants de cette enseiganat courant 
router.get('/ByEnseignant',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let idsSA = await Role.find({type : 'Etudiant'},'_id');
    console.log('idsSa :',idsSA);
    let users = await User.find({role:idsSA}).populate('classe').populate('parent')
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
    let enfant = await Enfant.findById(req.params.id).populate('classe').populate('parent')//.populate('directeur.etablissement').populate('classe');

    if(!enfant)
        return res.status(404).send('enfant Id is not found')
    res.send(enfant)
});

// add simple user 

router.post('',verifyToken,async (req,res)=>{
    //console.log( req.userId)
    let directeur = await User.findById(req.userId);
    if(!directeur)
        return res.status(404).send('directeur Id is not found')
    
    req.body.directeur = directeur
    //console.log(req.body.directeur)   
    
  
    /*
    dateNaissance :Date,
    //adresse :String,
    numero :Number,
    rue :String ,
    ville :String,
    codePostal :Number,
    */

    let enfant = await new Enfant(_.pick(req.body, ['nom', 'prenom', 'dateNaissance', 'numero','rue','ville','codePostal','parent' ,'classe','directeur']))
    //email=req.body.email
    try {
        // user.status = true
        // user.etat="Activé"  
        // let idsSA = await Role.find({type : 'Etudiant'},'_id');
        // //console.log('idsSa :',idsSA);
        // let r=idsSA[0]
        // user.role=r
        
        enfant = await enfant.save()
      
        
         

    } catch (error) {
        return res.status(400).send("Error store in DB: "+error.message)
    }
    res.status(201).send(enfant)

   
});

// add director Etablissement 
/*
router.post('/Directeurs',async (req,res)=>{
    
   
*/



router.put('/:id',verifyToken,async (req,res)=>{
    
    let enfant = await Enfant.findById(req.params.id);
    if(!enfant)
        return res.status(404).send('enfant Id is not found')
    
   
    //console.log(user) 
    //let newPass = user.password
   
        
        enfant=_.merge(enfant,req.body)
        enfant = await enfant.save();  
        res.send(enfant)
})


router.delete('/:id',verifyToken,async (req,res)=>{
    let enfant = await Enfant.findByIdAndDelete(req.params.id);
    if(!enfant)
        return res.status(404).send('enfant Id is not found')
    res.send(enfant)
})


module.exports=router