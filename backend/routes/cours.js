const router=require('express').Router();
const lodashsh = require('lodash');

const Classe = require('../models/classe');
const db = require("../config/db.config");
const User = db.users;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Cour = require('../models/cour');
//uplload
const fs = require('fs')
var path = require('path')
var multer = require('multer')
const crypto =require('crypto')
var storage = multer.diskStorage({
  destination: './uploads/',
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
// le document le plus télechargé 
router.get('/plusTelecharge',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
   let max =0;
   let doc ;
   let cours = await Cour.find({classe : req.params.id_cls}).find({enseignant :req.userId}).find({description: { $exists: false}}).populate('enseignant').populate('matiere').populate('classe')
   cours.forEach(element => {
    console.log("element")
    //console.log(element.enseignant._id)

    if (element.nbDownload > max){
        console.log("vrai")
         //console.log(element.enseignant.id)
        max=element.nbDownload;
        doc = element;
    }
    else{
        console.log("false")
    }
});
   res.send(doc)
})

// la liste des doucuments pour un enseigant
router.get('',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let cours = await Cour.find({description: { $exists: false}}).populate('enseignant').populate('matiere').populate('classe')
    cours.forEach(element => {
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



// la liste des cours pour un enseigant 
router.get('/withDescriptions',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let cours = await Cour.find({description: { $exists: true}}).populate('enseignant').populate('matiere').populate('classe')
    cours.forEach(element => {
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

// le nombre des doucuments pour un enseigant
router.get('/numberDoucuments',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let nb=0
    let results =[]
    let cours = await Cour.find({description: { $exists: false}}).populate('enseignant').populate('matiere').populate('classe')
    cours.forEach(element => {
        console.log("element")
        console.log(element.enseignant._id)

        if (req.userId  ==  element.enseignant._id){
            console.log("vrai")
             //console.log(element.enseignant.id)
            results.push(element)
            nb=nb+1
            
        }
        else{
            console.log("false")
        }
       
    });
    res.send(nb.toString());
})

// le nombre  des cours pour un enseigant 
router.get('/numberCours',verifyToken,async (req,res)=>{
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let nb=0;
    let cours = await Cour.find({description: { $exists: true}}).populate('enseignant').populate('matiere').populate('classe')
    cours.forEach(element => {
        console.log("element")
        console.log(element.enseignant._id)

        if (req.userId  ==  element.enseignant._id){
            console.log("vrai")
             //console.log(element.enseignant.id)
            results.push(element)
            nb=nb+1
            
        }
        else{
            console.log("false")
        }
       
    });
    res.send(nb.toString());
})


// le nombre de cours pour un enseiganat
router.get('/byEnseignant/numberCours',verifyToken,async (req,res)=>{
    let nb =0;
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let cours = await Cour.find().populate('enseignant').populate('matiere').populate('classe')
    cours.forEach(element => {
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
    res.send(nb.toString())
})

router.get('/toutesCours',verifyToken,async (req,res)=>{
    
    let cours = await Cour.find().populate('enseignant').populate('matiere').populate('classe')
    res.send(cours)
})

// la liste des doucuments pour un classe donné
router.get('/byClasse/:id_cls',verifyToken,async (req,res)=>{
    
    let cours = await Cour.find({classe : req.params.id_cls}).find({description: { $exists: false}}).populate('enseignant').populate('matiere').populate('classe')
    res.send(cours)
})
// la liste des cours avec descriptions pour un classe donné
router.get('/CoursWtithDescriptions/byClasse/:id_cls',verifyToken,async (req,res)=>{
    
    let cours = await Cour.find({classe : req.params.id_cls}).find({description: { $exists: true}}).populate('enseignant').populate('matiere').populate('classe')
    res.send(cours)
})

router.get('/:id',verifyToken,async (req,res)=>{
    let cour = await Cour.findById(req.params.id).populate('matiere').populate('classe')
    if(!cour)
        return res.status(404).send('cour Id is not found')
    res.send(cour)
});

router.get('/:id/update/download',verifyToken,async (req,res)=>{
    let cour = await Cour.findById(req.params.id);
    if(!cour)
        return res.status(404).send('cour Id is not found')
    cour.nbDownload = cour.nbDownload +1;
    await cour.save();
    console.log("nbDowload")
    res.send(cour)
});

router.get('/:id/update/views',verifyToken,async (req,res)=>{
    let cour = await Cour.findById(req.params.id);
    if(!cour)
        return res.status(404).send('cour Id is not found')
    cour.nbVues = cour.nbVues +1;
    await cour.save();
    console.log("nbVues")
    res.send(cour)
});


router.post('',upload.single('file'),verifyToken,async(req,res)=>{
    let results =[]
    //console.log( req.userId)
    let enseignant = await User.findById(req.userId);
    if(!enseignant)
        return res.status(404).send('enseignant Id is not found')
    
   
   
    req.body.enseignant = enseignant
    req.body.classe = req.body.classe.split(',');
    //console.log(req.body.enseignant)
    //results=req.body.Classe

    let courPropreites = await lodashsh.pick(req.body,['nom','enseignant','description','matiere','classe'])
    courPropreites.filename=req.file.filename
    courPropreites.originalname=req.file.originalname
     //console.log('classes',cour)
    let cour = await new Cour(courPropreites)
      
    try {
        //console.log('courPropreites1',courPropreites1)
        cour.date=Date.now();
        cour.classe.selected=true;
        cour= await cour.save();
        //console.log('courPropreites1',cour)
    } catch (error) {
        return res.status(400).send("Error Store in DB : "+error.message)
    }

    

    res.status(201).send(cour)
});
// creer cous sans fichier
router.post('/createCors',verifyToken,async(req,res)=>{
    let enseignant = await User.findById(req.userId);
    if(!enseignant)
        return res.status(404).send('enseignant Id is not found')
    req.body.enseignant = enseignant

    let cours = new Cour(lodashsh.pick(req.body,['enseignant','nom','description','matiere','classe']));
    try {
        cours.date=Date.now();
        cours = await cours.save();
    } catch (error) {
        res.status(400).send("Save in DB Error"+ error.message)
    }
    
    res.send(cours);
});


router.delete('/:id',upload.single('file'),verifyToken,async (req,res)=>{
    let cour = await Cour.findByIdAndDelete(req.params.id);
    if(!cour)
        return res.status(404).send('cour Id is not found')
    console.log("cours",cour.filename) 
    let fi =cour.filename 
    let path ='./uploads/'+fi
    try {
        
        fs.unlinkSync(path)
        //file removed
      } catch(err) {
        console.error(err)
      }
    res.send(cour)
})
router.put('/:id', upload.single('file'),verifyToken,async (req,res)=>{

    let cour = await Cour.findById(req.params.id);
    if(!cour)
        return res.status(404).send('cour Id is not found')

    console.log("cours",cour.filename) 
    let fi =cour.filename     
    let path ='./uploads/'+fi
    req.body.classe = req.body.classe.split(',');  

    //cour.enseignant=req.body.classe;
    //cour.nom=req.body.nom
    cour.classe=req.body.classe;
    let courPropreites = lodashsh.merge(cour,req.body);
    if(req.file){
        try {
        
            fs.unlinkSync(path)
            //file removed
          } catch(err) {
            console.error(err)
          }
    courPropreites.filename=req.file.filename
    courPropreites.originalname=req.file.originalname
    }
    console.log('courPropreites',courPropreites)
    cour=await new Cour(courPropreites)
    //cour = lodashsh.merge(cour,req.body);
    cour = await cour.save();
    res.send(cour)
})
router.put('/coursWithdescription/:id',verifyToken,async (req,res)=>{

    let cour = await Cour.findById(req.params.id);
    if(!cour)
        return res.status(404).send('cour Id is not found')

    //req.body.classe = req.body.classe.split(',');    
    //cour.enseignant=req.body.classe;
    //cour.nom=req.body.nom
    cour.classe=req.body.classe;
    cour.matiere=req.body.matiere
    cour = lodashsh.merge(cour,req.body);
    //console.log('courPropreites',courPropreites)
    //cour=await new Cour(courPropreites)
    //cour = lodashsh.merge(cour,req.body);
    cour = await cour.save();
    res.send(cour)
})

// stastiques par rapport a une classe selon le nombre des cours et documents

// le nombre des doucuments pour un classe donné
router.get('/byClasse/numberDocuments/:id_cls',verifyToken,async (req,res)=>{
    
    let cours = await Cour.find({classe : req.params.id_cls}).find({description: { $exists: false}}).populate('enseignant').populate('matiere').populate('classe')
    nb=cours.length
    console.log(nb)
    res.send((nb).toString());
})
// le nombre des cours avec descriptions pour un classe donné
router.get('/byClasse/numberCors/:id_cls',verifyToken,async (req,res)=>{
    
    let cours = await Cour.find({classe : req.params.id_cls}).find({description: { $exists: true}}).populate('enseignant').populate('matiere').populate('classe')
    nb=cours.length
    console.log(nb)
    res.send((nb).toString());
})






module.exports=router