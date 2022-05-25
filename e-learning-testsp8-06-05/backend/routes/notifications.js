const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const Notification = require('../models/notification');
//uplload
var path = require('path')
var multer = require('multer')
const crypto =require('crypto')
var storage = multer.diskStorage({
  destination: './photos/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

//var upload = multer({ storage: storage })


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
router.get('',verifyToken,async (req,res)=>
{
    // let user = await User.findById(req.userId)
    // console.log("usernormal")
    // console.log(user._id)
    // console.log("idcourant")
    // console.log(req.userId)
    // let results =[]
    let notifications = await Notification.find()
    
    res.send(notifications)
})

module.exports=router