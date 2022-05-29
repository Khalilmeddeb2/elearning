const router = require('express').Router();
//const lodashsh = require('lodash');
const Notification = require('../models/notification');
const jwt = require('jsonwebtoken');
const db = require("../config/db.config");
const User = db.users;

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




router.get('/enseignant',verifyToken,async (req,res) => {
    //res.send(await Notification.find());
    //let notifications = await Notification.find()
    
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let notifications = await Notification.find()
    notifications.forEach(element => {
        console.log("element")
        console.log(element.userReception)

        if (req.userId  ==  element.userReception){
            console.log("vrai")
             //console.log(element.enseignant.id)
            results.push(element)
           
        }
        else{
            console.log("false")
        }
       
    });
    res.send(results)
});

router.get('/etudiant',verifyToken,async (req,res) => {
    //res.send(await Notification.find());
    //let notifications = await Notification.find()
    
    let user = await User.findById(req.userId)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let notifications = await Notification.find()
    notifications.forEach(element => {
        console.log("element")
        console.log(element.userReception)

        if (req.userId  ==  element.userReception){
            console.log("vrai")
             //console.log(element.enseignant.id)
            results.push(element)
           
        }
        else{
            console.log("false")
        }
       
    });
    res.send(results)
});


/**router.get('/etudiant',verifyToken,async (req,res) => {
    //res.send(await Notification.find());
    //let notifications = await Notification.find()
    
    let user = await User.findById(req.userId)
    console.log("heyyyyyyyyyyyyyyyyy userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",user)
    console.log("usernormal")
    console.log(user._id)
    console.log("idcourant")
    console.log(req.userId)
    let results =[]
    let notifications = await Notification.find()
    notifications.forEach(element => {
        console.log("element")
        console.log(element.classeReception)
        for (let c of element.classeReception){
        console.log("aloooooooooooooooooooooooooooooooooooooooo",c)
        console.log("w chnouaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",user.classe)
        {
        if (c.equals(user.classe)){
            console.log("vrai")
             //console.log(element.enseignant.id)
            results.push(element)
           
        }
        else{
            console.log("false")
        }
    }
        }
    });
    res.send(results)
});*/


router.get('/:id/selected',verifyToken,async (req,res)=>{
    let notification = await Notification.findById(req.params.id);
    if(!notification)
        return res.status(404).send('notification Id is not found')
    if(notification.selected == false)
    {
        notification.selected = true
    }
    else
    {
        notification.selected = false
    }
    await notification.save();
    console.log("verif")
    res.send(notification)
});

// router.post('',verifyToken,async (req,res) => {
//     let role = new Role(lodashsh.pick(req.body,'type'));
//     try {
//         role = await role.save();
//     } catch (error) {
//         res.status(400).send("Save in DB Error"+ error.message)
//     }
    
//     res.send(role);
// });
// // affiche le nombre des roles 
// router.get('/numberRoles',verifyToken,async (req,res)=>{
//     let roles = await Role.find();
//     nb=roles.length
//     console.log(nb)
//     res.send((nb).toString());
      
//   })

// router.get('/:id', verifyToken,async (req,res)=>{
//     let role = await Role.findById(req.params.id)
                                
//     if(!role)
//         return res.status(404).send('role Id is not found')
//     res.send(role)
// })

// router.delete('/:id', verifyToken,async (req,res)=>{
//     let role = await Role.findByIdAndDelete(req.params.id);
//     if(!role)
//         return res.status(404).send('role Id is not found')
//     res.send(role)
// })
// router.put('/:id', verifyToken,async (req,res)=>{
//     let role = await Role.findById(req.params.id);
//     if(!role)
//         return res.status(404).send('role Id is not found')
    
//     role = lodashsh.merge(role,req.body);
//     role = await role.save();
//     res.send(role)
// })





module.exports = router;