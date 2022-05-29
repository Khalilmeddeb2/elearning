const UserDAO = require('../controllers/user.controller.js');
const MD5 = require('md5');
const db = require("../config/db.config");
const User = db.users;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const lodashsh = require('lodash');
/* API to register new user */
exports.register = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(401).json({ message: 'Parameters are missing' })
    } else {
        try {
            let criteria = {
                email: req.body.email
            }
            const checkEmail = await UserDAO.getUsers(criteria);
            if (checkEmail && checkEmail.length == 1) {
                res.status(401).json({ message: 'email already registered' })
            } else {
                let userData = {
                    firstName: req.body.firstName ? req.body.firstName : "",
                    lastName: req.body.lastName ? req.body.lastName : "",
                    email: req.body.email,
                    phone: req.body.phone,
                    password: MD5(MD5(req.body.password)),
                    status: true,
                    
                };
                //userData.role="Admin"
                const addUser = await UserDAO.createUser(userData);
                // console
                if (addUser) {
                    res.status(200).json({ message: 'User registered successfully!' })
                } else {
                    res.status(403).json({ message: "Something went wrong" });
                }
            }
        } catch (error) {
            res.status(404).json({ message: "Something went wrong", error: error });
        }
    }
};

/* API to login user */
/*exports.login = async (req, res) => {
    let resultat = []
    let user = await new User(lodashsh.pick(req.body,['email','password']))
    const userIB = await User.findOne({ email: req.body.email }).populate('role').populate('etablissement');
    if (userIB) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(req.body.password, userIB.password);
      if (validPassword) {
        let payload = {subject : user._id}
        let token= jwt.sign(payload, 'secretkey')

        resultat.push(userIB);
        console.log(userIB)
        resultat.push(token)

        
        res.status(200).send(resultat)
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
   
}
        
   


*/

exports.login = async (req, res) => {
    let resultat = []
    console.log('hiii')
    const userIB = await User.findOne({ email: req.body.email }).populate('role').populate('etablissement');
    let userData = req.body;
    User.findOne({email: userData.email},async (error, user) =>{
        if (error)
        {
            console.log(error)
        }
        else
        {
            if(!user)
            {
                res.status(401).send('Email invalide')
            }
          else
            {
               if(user.status == false)
              {
                    res.status(401).send('Compte desactivee')
              }  

            else
            {
                console.log(user.password)
                let compare = await bcrypt.compare(req.body.password, user.password)
                if(!compare)
                {
                    console.log('Mot de passse invalide ')
                    res.status(401).send('Mot de passse invalide')
                }
                else
                {
                    console.log('login validé')
                    let payload = {subject : user._id}
                    let token= jwt.sign(payload, 'secretkey')

                    resultat.push(userIB);
                    console.log(userIB)
                    resultat.push(token)

                    
                    res.status(200).send(resultat)
                    
                }
            }
        } 
        }
    })
}