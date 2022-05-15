const router = require('express').Router();
const _ = require('lodash');
const Role = require('../models/role');
const Etablissement = require('../models/etablissement');
//const Role = require('../models/role');
const jwt = require('jsonwebtoken');

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
    let etablissements = await Etablissement.find().populate('role')
    res.send(etablissements)
})
// affiche les nombre des etablissmeents
router.get('/numberEtablissements',verifyToken,async (req,res)=>{
    let etbalissements = await Etablissement.find();
    nb=etbalissements.length
    console.log(nb)
    res.send((nb).toString());
      
  })

router.get('/:id', verifyToken,async (req,res)=>{
    let etablissement = await Etablissement.findById(req.params.id).populate('role')
                                
    if(!etablissement)
        return res.status(404).send('etbalissement Id is not found')
    res.send(etablissement)
})

router.post('/', verifyToken,async (req,res)=>{
    let role = await Role.findById(req.body.role);
    if(!role)
        return res.status(404).send('role Id is not found')
    //req.body.author.name=author.name

    let etablissement = await new Etablissement(_.pick(req.body, ['firstName','numeroRegister','pays','adresse','telephoneFixe','siteWeb','url','type','role']));
    try {
        etablissement.status = true;
        etablissement.etat = "Activé"
        etablissement = await etablissement.save();
    } catch (error) {
        return res.status(400).send("Error Store in DB : "+error.message)
    }

    res.status(201).send(etablissement)
})

router.put('/:id', verifyToken,async (req,res)=>{
    let etablissement = await Etablissement.findById(req.params.id);
    if(!etablissement)
        return res.status(404).send('etablissement Id is not found')
    /* if(req.body.title)
        course.title = req.body.title */
        etablissement.role=req.body.role
        etablissement = _.merge(etablissement,req.body);
        etablissement = await etablissement.save();
    res.send(etablissement)
})

router.delete('/:id', verifyToken,async (req,res)=>{
    let etablissement = await Etablissement.findByIdAndDelete(req.params.id);
    if(!etablissement)
        return res.status(404).send('etablissement Id is not found')
    res.send(etablissement)
})

router.get('/:id/status', verifyToken,async (req,res)=>{
    let etablissement = await Etablissement.findById(req.params.id);
    if(!etablissement)
        return res.status(404).send('etablissement Id is not found')
                                
    if(etablissement.status == true){
       etablissement.status=false
       etablissement.etat="Desactivé"}
    else{
       etablissement.status=true 
       etablissement.etat="Activé"  } 

    etablissement = await etablissement.save();   
    res.send(etablissement)
})
/////////
router.get('/:id/roles', verifyToken,async (req,res)=>{
    let etablissement = await Etablissement.findById(req.params.id).populate('role');
    if(!etablissement)
        return res.status(404).send('etablissement Id is not found')
      
    let roles =etablissement.role    
    res.send(roles)
})


module.exports = router