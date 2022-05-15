const router=require('express').Router();
const lodashsh = require('lodash');

const Classe = require('../models/classe');
const db = require("../config/db.config");
const User = db.users;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Enfant = require('../models/enfant');
const ProfilEnfant = require('../models/profilEnfant');
//uplload
var path = require('path')
var multer = require('multer')
const crypto =require('crypto')
var storage = multer.diskStorage({
  destination: './photosProfilsEnfants/',
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


// la liste des doucuments pour un enseigant
// router.get('',verifyToken,async (req,res)=>{
//     let user = await User.findById(req.userId)
//     console.log("usernormal")
//     console.log(user._id)
//     console.log("idcourant")
//     console.log(req.userId)
//     let results =[]
//     let profils = await Profil.find()
    
//     res.send(profils)
// })
// la liste des cours pour un enseigant 


// le nombre des doucuments pour un enseigant


// le nombre  des cours pour un enseigant 


// le nombre de cours pour un enseiganat

//627547ad9f0e2e3bc36d1a6e
router.get('/:id',verifyToken,async (req,res)=>{
    let profils = await ProfilEnfant.find({enfant:req.params.id}).populate('enfant')
    // console.log("usernormal")
    // console.log(user._id)
    // console.log("idcourant")
    // console.log(req.userId)
    // let results =[]
    // let profils = await Profil.find()
    // profils.forEach(element => {
    //     console.log("element")
    //     console.log(element.user._id)

    //     if (req.userId  ==  element.user._id){
    //         console.log("vrai")
    //          //console.log(element.enseignant.id)
    //         results.push(element)
            
    //     }
    //     else{
    //         console.log("false")
    //     }
       
    // });
    res.send(profils)
})


router.get('/:id',verifyToken,async (req,res)=>{
    let profil = await Profil.findById(req.params.id)
    if(!profil)
        return res.status(404).send('profil Id is not found')
    res.send(profil)
});






router.post('/:idEnfant',upload.single('image'),verifyToken,async(req,res)=>{
    let results =[]
    //console.log( req.userId)
    let enseignant = await User.findById(req.userId);
    if(!enseignant)
        return res.status(404).send('user Id is not found')
    
    let enfant = await Enfant.findById(req.params.idEnfant);
    if(!enfant)
        return res.status(404).send('enfant Id is not found')
     
    req.body.enseignant = enseignant
    req.body.enfant =enfant
    //req.body.classe = req.body.classe.split(',');
    //console.log(req.body.enseignant)
    //results=req.body.Classe

    let profilPropreites= await lodashsh.pick(req.body,['enseignant','enfant'])
    profilPropreites.filename=req.file.filename
    profilPropreites.originalname=req.file.originalname
     //console.log('classes',cour)
    let profil = await new ProfilEnfant(profilPropreites)
     //let cour = await new Cour(courPropreites)
      
    try {
        //console.log('courPropreites1',courPropreites1)
        //cour.date=Date.now();
        //cour.classe.selected=true;
        profil= await profil.save();
        //console.log('courPropreites1',cour)
    } catch (error) {
        return res.status(400).send("Error Store in DB : "+error.message)
    }

    

    res.status(201).send(profil)
});
// creer cous sans fichier



// router.delete('/:id',upload.single('file'),verifyToken,async (req,res)=>{
//     let cour = await Cour.findByIdAndDelete(req.params.id);
//     if(!cour)
//         return res.status(404).send('cour Id is not found')
//     res.send(cour)
// })

// router.put('/:id', upload.single('image'),verifyToken,async (req,res)=>{

//     let profil = await Profil.findById(req.params.id);
//     if(!profil)
//         return res.status(404).send('profil Id is not found')



//     let profilPropreites = lodashsh.merge(profil,req.body);
//     if(req.file){
//     profilPropreites.filename=req.file.filename
//     profilPropreites.originalname=req.file.originalname
//     }
//     console.log('profilPropreites',profilPropreites)
//     profil=await new Profil(profilPropreites)
//     //cour = lodashsh.merge(cour,req.body);
//     profil = await profil.save();
//     res.send(profil)
// })




module.exports=router