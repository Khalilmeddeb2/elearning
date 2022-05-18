const router = require('express').Router();
const lodashsh = require('lodash');
const Role = require('../models/role');
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




router.get('',verifyToken,async (req,res) => {
    res.send(await Role.find({ type: { $ne: "SuperAdmin"} }));
});

router.post('',verifyToken,async (req,res) => {
    let role = new Role(lodashsh.pick(req.body,'type'));
    try {
        //tx on peut les setters ici par id utlisateur 
        req.io.emit('tx', "messange send");
        console.log("req.io",req.io)
        role = await role.save();
    } catch (error) {
        res.status(400).send("Save in DB Error"+ error.message)
    }
    
    res.send(role);
});
// affiche le nombre des roles 
router.get('/numberRoles',verifyToken,async (req,res)=>{
    let roles = await Role.find();
    nb=roles.length
    console.log(nb)
    res.send((nb).toString());
      
  })

router.get('/:id', verifyToken,async (req,res)=>{
    let role = await Role.findById(req.params.id)
                                
    if(!role)
        return res.status(404).send('role Id is not found')
    res.send(role)
})

router.delete('/:id', verifyToken,async (req,res)=>{
    let role = await Role.findByIdAndDelete(req.params.id);
    if(!role)
        return res.status(404).send('role Id is not found')
    res.send(role)
})
router.put('/:id', verifyToken,async (req,res)=>{
    let role = await Role.findById(req.params.id);
    if(!role)
        return res.status(404).send('role Id is not found')
    
    role = lodashsh.merge(role,req.body);
    role = await role.save();
    res.send(role)
})





module.exports = router;
