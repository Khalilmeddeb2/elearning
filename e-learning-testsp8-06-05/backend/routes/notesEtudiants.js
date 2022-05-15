const router=require('express').Router();
const lodashsh = require('lodash');

const NoteEtudiant = require('../models/noteEtudiant');
const Test = require('../models/test');
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

router.get('/:id_test',verifyToken,async (req,res)=>{
    // let user = await User.findById(req.userId)
    // console.log("usernormal")
    // console.log(user._id)
    // console.log("idcourant")
    // console.log(req.userId)
    //let results =[]
    let notes = await NoteEtudiant.find({test:req.params.id_test}).populate('test').populate({path :'test',select:'classe'})//.populate('matiere')
    
console.log("note1",notes[0])
    //     if (req.userId  ==  element.enseignant._id){
    //         console.log("vrai")
    //          //console.log(element.directeur.id)
    //         results.push(element)
            
    //     }
    //     else{
    //         console.log("false")
    //     }
       
    
    res.send(notes);
})

/*router.get('/byClasse/:id_cls',verifyToken,async (req,res)=>{
    
    let tests = await Exercice.find({classe : req.params.id_cls}).populate('enseignant').populate('question').populate('classe')
    res.send(tests)
})*/

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
    let note = await new NoteEtudiant(lodashsh.pick(req.body,['enseignant','test','score']))

    try {
        note= await note.save();
        console.log('note',note)
    } catch (error) {
        return res.status(400).send("Error Store in DB : "+error.message)
    }

    

     res.status(201).send(note)
 });






router.get('/:id/update/:score',verifyToken,async (req,res)=>{
    
    console.log( req.userId)
    let enseignant = await User.findById(req.userId);
    if(!enseignant)
        return res.status(404).send('enseignant Id is not found')

    let test = await Test.findById(req.params.id);
    if(!test)
        return res.status(404).send('test Id is not found')
    
    req.body.enseignant = enseignant  
    req.body.test = test  
    req.body.score = req.params.score
    note =new NoteEtudiant(lodashsh.pick(req.body,['enseignant','test','score']))   
    //note.score = 10;
    note = await note.save();
    console.log("score",note)
    res.send(note)
});

module.exports=router