const express = require('express');
const userRoutes = express.Router();
const {
    signUp,login,getAllUser
}= require('../controller/signUp.controller')

userRoutes.post('/signUp',signUp);
userRoutes.post('/login',login);
userRoutes.get('/getAllUser',getAllUser);


module.exports = userRoutes;