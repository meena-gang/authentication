const express = require('express');
const UserModel = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const auth = require('../middleware/authMiddleware')

userRouter.post('/register',async(req,res) => { 
    const {userName,email,password,age}=req.body
    try{
        bcrypt.hash(password, 8, async (err, hash)=>{
        const user = new UserModel({userName,email,password:hash,age})
        await user.save()
        res.status(200).send("Registered")
    });
    }catch(err){
        res.status(404).send(err)
    }
})

userRouter.post('/login', async(req,res) => {
    const{email,password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                const token = jwt.sign({email:email}, 'masai',{ expiresIn: '1h' });
                res.status(200).send({"msg":"Login Successfull","token":token})
                } else {
                    res.send("Login failed: Incorrect password")}
                });
        }else{
            res.status(404).send("login failed");
        }
    }catch(err){
        res.status(404).send(err.message);
    }

})

userRouter.get('/data',auth,(req,res) => {
    console.log(req.user);
    res.send("Welcome to protected route")
})

module.exports = userRouter;
