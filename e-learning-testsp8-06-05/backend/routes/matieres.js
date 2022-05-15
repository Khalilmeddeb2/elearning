const router=require('express').Router();
const lodashsh = require('lodash');

const Matiere = require('../models/matiere');
const Question=require('../models/question')
const db = require("../config/db.config");
const User = db.users;
//const Demandecoach = require('../models/demandeCoach');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const Cours = require('../models/cour');

function verifyToken(req, res, next)
{
    if( !req.headers.authorization)
    {
        console.log('Oh nooo !! ')
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === ('null'))
    {
        return res.status(401).send('Unauthorized request')   
    }

    let payload = jwt.verify(token, 'secretkey')
    if (!payload)
    {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
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
    let matieres = await Matiere.find().populate('directeur.etablissement')
    matieres.forEach(element => {
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
// le nombre de matieres existant pour un etblissmeent
router.get('/numberMatieres',verifyToken,async(req,res)=>{
    let results =[]
    let nb=0;
    let matieres = await Matiere.find()
       matieres.forEach(element => {
        console.log("element")
        console.log(element.directeur._id)

        if (req.userId  ==  element.directeur._id){
            console.log("vrai")
             //console.log(element.directeur.id)
            results.push(element)
            nb=results.length
        }
        else{
            console.log("false")
        }
       
    });
    res.send(nb.toString());
})


router.get('/:id',verifyToken,async (req,res)=>{
    let matiere = await Matiere.findById(req.params.id)//.populate('etablissement');
    if(!matiere)
        return res.status(404).send('matiere Id is not found')
    res.send(matiere)
});

router.post('',verifyToken,async(req,res)=>{
    
    console.log( req.userId)
    let directeur = await User.findById(req.userId);
    if(!directeur)
        return res.status(404).send('directeur Id is not found')
  //req.body.directeur.id=req.userId
  //req.body.directeur.firstName=directeur.firstName
  //req.body.directeur.lastName=directeur.lastName
  //req.body.directeur.email=directeur.email
  //req.body.directeur.etablissement=directeur.etablissement

  /*req.body.coach.firstName=coach.firstName
    req.body.coach.lastName=coach.lastName*/ 
   
    req.body.directeur = directeur
    console.log(req.body.directeur)
   

   /* if(!coach)
        return res.status(404).send('coach Id is not found');
    req.body.coach.firstName=coach.firstName
    req.body.coach.lastName=coach.lastName
    req.body.valid = false */
    let matiere = await new Matiere(lodashsh.pick(req.body,['nom','directeur']))

    try {
        matiere= await matiere.save();
        console.log('matiere',matiere)
    } catch (error) {
        return res.status(400).send("Error Store in DB : "+error.message)
    }

    

    res.status(201).send(matiere)
});

router.delete('/:id', verifyToken,async (req,res)=>{
    let matiere = await Matiere.findByIdAndDelete(req.params.id);
    if(!matiere)
        return res.status(404).send('matiere Id is not found')
    await Cours.deleteMany({
        matiere : matiere._id
        })  
    await Question.deleteMany({
        matiere : matiere._id
        })          
    res.send(matiere)
})
router.put('/:id', verifyToken,async (req,res)=>{
    let matiere = await Matiere.findById(req.params.id);
    if(!matiere)
        return res.status(404).send('matiere Id is not found')
    
    matiere = lodashsh.merge(matiere,req.body);
    matiere = await matiere.save();
    res.send(matiere)
})



module.exports=router