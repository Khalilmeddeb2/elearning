const router=require('express').Router();
const lodashsh = require('lodash');

const Exercice = require('../models/exercice');
const db = require("../config/db.config");
const User = db.users;
//const Demandecoach = require('../models/demandeCoach');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs')


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
    let exercices = await Exercice.find().populate('question').populate('classe').populate('matiere')
    exercices.forEach(element => {
        console.log("element")
        console.log(element.enseignant._id)

        if (req.userId  ==  element.enseignant._id){
            console.log("vrai")
             //console.log(element.directeur.id)
            results.push(element)
            
        }
        else{
            console.log("false")
        }
       
    });
    res.send(results);
})
// le nombre de exercices existant pour un enseiganat
router.get('/numberExercices',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let nb=0;
    let exercices = await Exercice.find().populate('question').populate('classe')
    exercices.forEach(element => {
        console.log("element")
        console.log(element.enseignant._id)

        if (req.userId  ==  element.enseignant._id){
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


router.get('/byClasse/:id_cls',verifyToken,async (req,res)=>{
    
    let exercices = await Exercice.find({classe : req.params.id_cls}).populate('enseignant').populate('question').populate('classe')
    res.send(exercices)
})

router.get('/:id/update/testDone',verifyToken,async (req,res)=>{
    let exercice = await Exercice.findById(req.params.id);
    if(!exercice)
        return res.status(404).send('exercice Id is not found')
        exercice.verif = true;
    await exercice.save();
    console.log("verif")
    res.send(exercice)
});

router.get('/:id/score/',verifyToken,async (req,res)=>{
    let exercice = await Exercice.findById(req.params.id);
    
    if(!exercice)
        return res.status(404).send('exercice Id is not found')
        exercice.score = exercice.score;
    await exercice.save();
    console.log("score")
    res.send(exercice)
});

router.get('/:id',verifyToken,async (req,res)=>{
    let exercice = await Exercice.findById(req.params.id).populate('question').populate('classe').populate('matiere')
    if(!exercice)
        return res.status(404).send('exercice Id is not found')
    res.send(exercice)
});

router.post('',verifyToken,async(req,res)=>{
    
    console.log( req.userId)
    let enseignant = await User.findById(req.userId);
    if(!enseignant)
        return res.status(404).send('enseignant Id is not found')



  //req.body.directeur.id=req.userId
  //req.body.directeur.firstName=directeur.firstName
  //req.body.directeur.lastName=directeur.lastName
  //req.body.directeur.email=directeur.email
  //req.body.directeur.etablissement=directeur.etablissement

  /*req.body.coach.firstName=coach.firstName
    req.body.coach.lastName=coach.lastName*/ 
   
    // req.body.enseignant = enseignant
    // console.log(req.body.enseignant)
   

   /* if(!coach)
        return res.status(404).send('coach Id is not found');
    req.body.coach.firstName=coach.firstName
    req.body.coach.lastName=coach.lastName
    req.body.valid = false */
    req.body.enseignant = enseignant
    let exercice = await new Exercice(lodashsh.pick(req.body,['enseignant','nom','titre','matiere','question','classe','temps']))

    try {
        exercice= await exercice.save();
        console.log('exercice',exercice)
    } catch (error) {
        return res.status(400).send("Error Store in DB : "+error.message)
    }

    

    res.status(201).send(exercice)
});

router.delete('/:id', verifyToken,async (req,res)=>{
    let exercice = await Exercice.findByIdAndDelete(req.params.id);
    if(!exercice)
        return res.status(404).send('exercice Id is not found')
    res.send(exercice)
})
router.put('/:id', verifyToken,async (req,res)=>{
    let exercice = await Exercice.findById(req.params.id);
    if(!exercice)
        return res.status(404).send('exercice Id is not found')
    
        exercice.classe=req.body.classe;
        exercice.question=req.body.question    
        exercice = lodashsh.merge(exercice,req.body);
        exercice = await exercice.save();
    res.send(exercice)
})


router.get('/byClasse/numberExercices/:id_cls',verifyToken,async (req,res)=>{
    
    let exercices = await Exercice.find({classe : req.params.id_cls}).populate('enseignant').populate('question').populate('classe')
    nb=exercices.length
    console.log(nb)
    res.send((nb).toString());
})


module.exports=router
