const router = require('express').Router();
const _ = require('lodash');
const Role = require('../models/role');

exports.getRoles = async (req, res) => {
    res.send(await Role.find());
};

router.post('',async (req,res) => {
    let role = new Role(_.pick(req.body,'type'));
    try {
        role = await role.save();
    } catch (error) {
        res.status(400).send("Save in DB Error"+ error.message)
    }
    
    res.send(role);
});

router.get('/:id', async (req,res)=>{
    let role = await Role.findById(req.params.id)
                                
    if(!role)
        return res.status(404).send('role Id is not found')
    res.send(role)
})

router.delete('/:id', async (req,res)=>{
    let role = await Role.findByIdAndDelete(req.params.id);
    if(!role)
        return res.status(404).send('role Id is not found')
    res.send(role)
})
router.put('/:id', async (req,res)=>{
    let role = await Role.findById(req.params.id);
    if(!role)
        return res.status(404).send('role Id is not found')
    
    role = _.merge(role,req.body);
    role = await role.save();
    res.send(role)
})



module.exports = router;
