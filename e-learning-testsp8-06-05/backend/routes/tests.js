const router=require('express').Router();
const lodashsh = require('lodash');

const Test = require('../models/test');
const db = require("../config/db.config");
const User = db.users;
//const Demandecoach = require('../models/demandeCoach');
const jwt = require('jsonwebtoken');
const { redirect } = require('express/lib/response');
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

router.get('/dates',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let tests = await Test.find().sort({dateFin :-1}).limit(5)//.populate('question').populate('classe').populate('matiere')
    tests.forEach(element => {
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

router.get('',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let tests = await Test.find().populate('question').populate('classe').populate('matiere')
    tests.forEach(element => {
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
router.get('/numberTests/:mois',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let nb=0;
    let moisTest ;
    moisTest=parseInt(req.params.mois)+1
    console.log("daaaaaaaaate",moisTest)
    let testsAggre = await Test.aggregate([
        {$addFields: {  "month" : {$month: '$dateFin'}}},
        {$match: { month: moisTest}}
      ])
      let tests = await Test.populate(testsAggre,{path:'classe'});
    tests.forEach(element => {
        console.log("element")
        console.log(element.enseignant._id)
        console.log("donne moi la date",element.dateFin.getMonth())

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

    let dateAuj =new Date()
    //console.log("dateAuj",dateAuj)
    let tests = await Test.find({classe : req.params.id_cls}).find({publie : true}).find({dateFin : { $gt: dateAuj } }).populate('enseignant').populate('question').populate('classe')
    //console.log("dateTest",tests[0].dateFin)
    res.send(tests)
})

router.get('/:id/update/testDone',verifyToken,async (req,res)=>{
    let test = await Test.findById(req.params.id);
    if(!test)
        return res.status(404).send('test Id is not found')
        test.verif = true;
    await test.save();
    console.log("verif")
    res.send(test)
});

// router.get('/:id/score/',verifyToken,async (req,res)=>{
//     let exercice = await Exercice.findById(req.params.id);
    
//     if(!exercice)
//         return res.status(404).send('exercice Id is not found')
//         exercice.score = exercice.score;
//     await exercice.save();
//     console.log("score")
//     res.send(exercice)
// });

router.get('/:id',verifyToken,async (req,res)=>{
    let test = await Test.findById(req.params.id).populate('question').populate('classe').populate('matiere')
    if(!test)
        return res.status(404).send('test Id is not found')
    res.send(test)
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
    let test = await new Test(lodashsh.pick(req.body,['enseignant','nom','titre','matiere','dateFin','temps','question','classe']))

    try {
        test.dateDebut=Date.now();
        test= await test.save();
        console.log('test',test)
    } catch (error) {
        return res.status(400).send("Error Store in DB : "+error.message)
    }

    

    res.status(201).send(test)
});

router.delete('/:id', verifyToken,async (req,res)=>{
    let test = await Test.findByIdAndDelete(req.params.id);
    if(!test)
        return res.status(404).send('test Id is not found')
    res.send(test)
})
router.put('/:id', verifyToken,async (req,res)=>{
    let test = await Test.findById(req.params.id);
    if(!test)
        return res.status(404).send('test Id is not found')
    
        test.classe=req.body.classe;
        test.question=req.body.question    
        test = lodashsh.merge(test,req.body);
        test = await test.save();
    res.send(test)
})

// router.get('/byClasse/:id_cls',verifyToken,async (req,res)=>{
    
//     let tests = await Exercice.find({classe : req.params.id_cls})//.populate('enseignant').populate('question').populate('classe')
//     res.send(tests)
// })
//

router.get('/byClasse/numberTests/:id_cls',verifyToken,async (req,res)=>{
    
    let tests = await Test.find({classe : req.params.id_cls}).populate('enseignant').populate('question').populate('classe')
    nb=tests.length
    console.log(nb)
    res.send((nb).toString());
})

router.get('/:id/update/testDone',verifyToken,async (req,res)=>{
    let test = await Test.findById(req.params.id);
    if(!test)
        return res.status(404).send('test Id is not found')
        test.verif = true;
    await test.save();
    console.log("verif")
    res.send(test)
});

router.get('/:id/update/testPublish',verifyToken,async (req,res)=>{
    let test = await Test.findById(req.params.id);
    if(!test)
        return res.status(404).send('test Id is not found')
        test.publie = true;
    await test.save();
    console.log("verif")
    res.send(test)
});

module.exports=router
