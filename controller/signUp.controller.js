const e = require('express');
const User = require('../model/signUp.model');
const bcrypt = require('bcrypt');

exports.getAllUser = async( req, res) =>{
    try{
        let user = await User.find();
        res.status(201).json(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'internal server error...'});
    }
}


exports.signUp = async(req , res)=>{
    try{
        let {firstName,lastName,email,password,gender} = req.body;
        let user = await User.findOne({email:email,isDeleted:false});
        if (user) {
            return res.json({message:'user is already exist...'});
        }
        let hashPassword = await bcrypt.hash(password,10);
        console.log(hashPassword);
        user = await User.create({
            firstName,lastName,email,password:hashPassword,gender
        });
        user.save();
        res.status(201).json({user,message:'user is added'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'internal server added...'});
    }
}


exports.login =  async(req, res)=>{
    try{
        let {email,password} = req.body;
        let user = await User.findOne({email:email,isDeleted:false});
        if (!user) {
            return res.json({message:'user is not found...'});
        }
        let checkPassword = await bcrypt.compare(password,user.password);
        if (!checkPassword) {
            return res.json({message:'password is not matched..'});
        }
        res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'internal server added...'});
    }
}