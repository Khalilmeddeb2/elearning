const router=require('express').Router();
const lodashsh = require('lodash');

const Classe = require('../models/classe');
const Matiere = require('../models/matiere');
const db = require("../config/db.config");
const User = db.users;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


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
    let classes = await Classe.find().populate('enseignant')//.populate('etablissement')
    classes.forEach(element => {
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

router.get('/numberclasses',verifyToken,async(req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let nb = 0
    let classes = await Classe.find().populate('enseignant')//.populate('etablissement')
    classes.forEach(element => {
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
    nb=results.length
    console.log('nb',nb)
    res.send((nb).toString());
})

 function  parcours1(classes){
    return new Promise(async (resolve,reject)=>{
        let results=[]
        for (let index = 0; index < classes.length; index++) {
            console.log(classes[index].enseignant.length)
            
            classes[index].enseignant[0].matiere =await Matiere.find({_id:classes[index].enseignant[0].matiere});
     
            results.push(classes[index])
           

        } 
        
       

resolve(results)
    })
    
}

// la liste des classes pour un enseiganant 
router.get('/ByEnseignants',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let classes = await Classe.find({enseignant : req.userId}).populate('enseignant')
  results = await parcours1(classes);
     
    //console.log(cls.matiere)
     // 
    res.send(results)







})

// le nombre des classes pour un enseiganant
router.get('/ByEnseignant/numberClasses',verifyToken,async (req,res)=>{
    let nb =0;
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let classes = await Classe.find({enseignant : req.userId}).populate('enseignant')
    results = await parcours1(classes);
    nb=results.length
    //console.log(cls.matiere)
     // 
     res.send((nb).toString());

})

function  parcours2(classes){
    return new Promise(async (resolve,reject)=>{
        let results=[]
        for (let index = 0; index < classes.length; index++) {
            console.log(classes[index].enseignant.length)
            for (let i = 0; i < classes[index].enseignant.length ; i++) {

                //console.log('1er',classes[index]._id)
                //console.log('1er',classes[index]._id)
               
            classes[index].enseignant[i].matiere =await Matiere.find({_id:classes[index].enseignant[i].matiere});
              
            results.push(classes[index])
               
            }
        } 
        
       

resolve(results)
    })
    
}
//la liste des matieres pour un enseiganat 
router.get('/ByEnseignant/bymatieres',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    //console.log("usernormal")
    //console.log(user._id)
    //console.log("idcourant")
    //console.log(req.userId)
    let results =[]
    resultsMatieres =[];
    let classes = await Classe.find({enseignant : req.userId}).populate('enseignant')
  results = await parcours2(classes);
     
  results.forEach(element => {
    console.log("element")
    console.log(element.enseignant.length)
    element.enseignant.forEach(e => {
        console.log("e",e._id)
    if (req.userId  ==  e._id){
        console.log("vrai")
         //console.log(element.directeur.id)
        resultsMatieres.push(e)
        
    }
    else{
        console.log("false")
    }
}); 
});

    res.send(resultsMatieres[0].matiere)
})

// le nombre des matieres pour un enseiganat
router.get('/ByEnseignant/numberMatieres',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    let nb=0
    //let nombre="";
    let results =[]
    resultsMatieres =[];
    let classes = await Classe.find({enseignant : req.userId}).populate('enseignant')
  results = await parcours2(classes);
     
  results.forEach(element => {
    console.log("element")
    console.log(element.enseignant.length)
    element.enseignant.forEach(e => {
        console.log("e",e._id)
    if (req.userId  ==  e._id){
        console.log("vrai")
         //console.log(element.directeur.id)
        resultsMatieres.push(e)
        //nb=resultsMatieres[0].matiere.length
        console.log("nb0",nb)
        //nombre=nb;
    }
    else{
        console.log("false")
    }
}); 
});
//console.log("nb1",nb)
nb=resultsMatieres[0].matiere.length
res.send(nb.toString())
})

router.get('/:id',verifyToken,async (req,res)=>{
    let classe = await Classe.findById(req.params.id).populate('enseignant');
    if(!classe)
        return res.status(404).send('classe Id is not found')
    res.send(classe)
});

router.post('',verifyToken,async(req,res)=>{
    
    console.log( req.userId)
    let directeur = await User.findById(req.userId);
    if(!directeur)
        return res.status(404).send('directeur Id is not found')
    
    /*let enseignant = await User.findById(req.body.enseignant);
    if(!enseignant)
        return res.status(404).send('enseignant Id is not found');
        
        */

  //req.body.directeur.id=req.userId
  //req.body.directeur.firstName=directeur.firstName
  //req.body.directeur.lastName=directeur.lastName
  //req.body.directeur.email=directeur.email
  //req.body.directeur.etablissement=directeur.etablissement

  /*req.body.coach.firstName=coach.firstName
    req.body.coach.lastName=coach.lastName*/ 
   
    req.body.directeur = directeur
    console.log(req.body.directeur)
    //req.body.enseignant=enseignant

   /* if(!coach)
        return res.status(404).send('coach Id is not found');
    req.body.coach.firstName=coach.firstName
    req.body.coach.lastName=coach.lastName
    req.body.valid = false */
    let classe = await new Classe(lodashsh.pick(req.body,['nom','directeur','enseignant']))

    try {
        classe.nbEtudiants=0;
        classe= await classe.save();
        console.log('classe',classe)
    } catch (error) {
        return res.status(400).send("Error Store in DB : "+error.message)
    }

    

    res.status(201).send(classe)
});

router.delete('/:id', verifyToken,async (req,res)=>{
    let classe = await Classe.findByIdAndDelete(req.params.id);
    if(!classe)
        return res.status(404).send('matiere Id is not found')
    res.send(classe)
})
router.put('/:id', verifyToken,async (req,res)=>{
    let classe = await Classe.findById(req.params.id);
    if(!classe)
        return res.status(404).send('matiere Id is not found')
    classe.enseignant=req.body.enseignant;
    classe = lodashsh.merge(classe,req.body);
    classe = await classe.save();
    res.send(classe)
})
module.exports=router