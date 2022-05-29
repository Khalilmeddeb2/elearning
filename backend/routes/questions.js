const router=require('express').Router();
const lodashsh = require('lodash');

const Question = require('../models/question');
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
    let questions = await Question.find().populate('matiere')
    questions.forEach(element => {
        console.log("element")
        console.log(element.enseignant._id)

        if (req.userId  ==  element.enseignant._id){
            console.log("vrai")
             //console.log(element.enseignant.id)
            results.push(element)
            
        }
        else{
            console.log("false")
        }
       
    });
    res.send(results)
})
// le nombre de matieres  pour un enseiganat
router.get('/numberQuestions',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let nb=0;
    let questions = await Question.find().populate('matiere')
    questions.forEach(element => {
        console.log("element")
        console.log(element.enseignant._id)

        if (req.userId  ==  element.enseignant._id){
            console.log("vrai")
             //console.log(element.enseignant.id)
            results.push(element)
            nb=results.length
            
        }
        else{
            console.log("false")
        }
       
    });
    res.send(nb.toString());})


router.get('/:id',verifyToken,async (req,res)=>{
    let question = await Question.findById(req.params.id).populate('matiere');//.populate('etablissement');
    if(!question)
        return res.status(404).send('question Id is not found')
    res.send(question)
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

    let question = await new Question(lodashsh.pick(req.body,['enseignant','nom','question','choix','answer','matiere']))

    try {
        question= await question.save();
        console.log('question',question)
    } catch (error) {
        return res.status(400).send("Error Store in DB : "+error.message)
    }

    

    res.status(201).send(question)
});

router.delete('/:id', verifyToken,async (req,res)=>{
    let question = await Question.findByIdAndDelete(req.params.id);
    if(!question)
        return res.status(404).send('question Id is not found')
    res.send(question)
})
router.put('/:id', verifyToken,async (req,res)=>{
    let question = await Question.findById(req.params.id)
    if(!question)
        return res.status(404).send('question Id is not found')
    
        question.choix = req.body.choix
        question = lodashsh.merge(question,req.body);
        question = await question.save();
    res.send(question)
})

router.get('/byMatiere/:id_Mat',verifyToken,async (req,res)=>{
    
    let questions = await Question.find({matiere : req.params.id_Mat}).populate('matiere')
    res.send(questions)
})



module.exports=router