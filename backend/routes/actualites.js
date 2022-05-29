const router=require('express').Router();
const lodashsh = require('lodash');


const db = require("../config/db.config");
const User = db.users;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Actualite = require('../models/actualite');
//uplload
const fs = require('fs')
var path = require('path')
var multer = require('multer')
const crypto =require('crypto')
var storage = multer.diskStorage({
  destination: './actualitesPhotos/',
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
    let actualites = await Actualite.find()
    res.send(actualites)
})


router.get('/:id',verifyToken,async (req,res)=>{
    let actualite = await Actualite.findById(req.params.id)
    if(!actualite)
        return res.status(404).send('actualite Id is not found')
    res.send(actualite)
});






router.post('',upload.single('image'),verifyToken,async(req,res)=>{
    // let results =[]
    // //console.log( req.userId)
    // let user = await User.findById(req.userId);
    // if(!user)
    //     return res.status(404).send('user Id is not found')
    
   
   
    // req.body.user = user
    //req.body.classe = req.body.classe.split(',');
    //console.log(req.body.enseignant)
    //results=req.body.Classe

    let actualitePropreites= await lodashsh.pick(req.body,['titre','description'])
    actualitePropreites.filename=req.file.filename
    actualitePropreites.originalname=req.file.originalname
     //console.log('classes',cour)
    let actualite = await new Actualite(actualitePropreites)
     //let cour = await new Cour(courPropreites)
      
    try {
        //console.log('courPropreites1',courPropreites1)
        actualite.date=Date.now();
        //cour.classe.selected=true;
        actualite= await actualite.save();
        //console.log('courPropreites1',cour)
    } catch (error) {
        return res.status(400).send("Error Store in DB : "+error.message)
    }

    

    res.status(201).send(actualite)
});

router.put('/:id', upload.single('image'),verifyToken,async (req,res)=>{

    let actualite = await Actualite.findById(req.params.id);
    if(!actualite)
        return res.status(404).send('actualite Id is not found')

        console.log("actua",actualite.filename) 
        let fi =actualite.filename 
        let path ='./actualitesPhotos/'+fi

    let actualitePropreites = lodashsh.merge(actualite,req.body);
    if(req.file){
        actualitePropreites.filename=req.file.filename
        actualitePropreites.originalname=req.file.originalname
        try {
        
            fs.unlinkSync(path)
            //file removed
          } catch(err) {
            console.error(err)
          }    
    }
    console.log('actualitePropreites',actualitePropreites)
    actualite=await new Actualite(actualitePropreites)
    //cour = lodashsh.merge(cour,req.body);
    actualite = await actualite.save();
    res.send(actualite)
})


router.delete('/:id', verifyToken,async (req,res)=>{
    let actualite = await Actualite.findByIdAndDelete(req.params.id);
    if(!actualite)
        return res.status(404).send('actualite Id is not found')
        console.log("actua",actualite.filename) 
        let fi =actualite.filename 
        let path ='./actualitesPhotos/'+fi
        try {
        
            fs.unlinkSync(path)
            //file removed
          } catch(err) {
            console.error(err)
          }    
    res.send(actualite)
})

module.exports=router