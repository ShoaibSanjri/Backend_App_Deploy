const express = require("express");
const {UserModel} = require("../model/user.model")
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

userRouter.post("/register", (req, res) => {
    console.log(req.body)
    const {name, email, pass, age} = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (hash) {
                let user = new UserModel({name, email, pass:hash, age});
                    await user.save()
                    res.status(200).send({"msg":"User registerd!"})
            }
            else {
                res.send({'msg':err})
            }
        });
        
    }
    catch (err) {
        res.status(400).send({"msg":err})
    }
})

userRouter.post("/login", async (req, res) => {
    let {email,pass} = req.body
    try {
        
        let user = await UserModel.findOne({email});
        // console.log(user)
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result)  =>{
                if (result) {
                    const token = jwt.sign({ authorID: 1 }, 'masai');
                    res.status(200).send({"msg":"Login successful","token":token})
                }
                else {
                    res.status(200).send({"msg":"wrong credentials"})
                }
            });
            

        }
        else {
            
            res.status(200).send({"msg":"wrong credentials"})
            }
    }
    catch (err) {
        res.status(400).send({"msg":err})
    }
})

module.exports = {
    userRouter
}