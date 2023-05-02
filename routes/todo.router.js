const express = require("express");
const {TodoModel} = require("../model/todo.model")
const todoRouter = express.Router();
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth.middleware");

todoRouter.post("/addtodo", async (req, res) => {
    let token  = req.headers.authorization.split(" ")[1]
    jwt.verify(token, 'masai', async (err, decoded) => {
        if (decoded) {
            let todo = new TodoModel(req.body);
            await todo.save()
            res.status(200).send({"msg":"todo registerd!"})
        }
        else {
            res.status(400).send({"msg":err})
        }
      });
    
})
todoRouter.get("/gettodo",auth, async (req, res) => {
    res.send("data")
    
})
todoRouter.patch("/updatetodo", async (req, res) => {
    let token  = req.headers.authorization.split(" ")[1]
    let {id,is_completed} = req.body
    jwt.verify(token, 'masai', async (err, decoded) => {
        if (decoded) {
            await TodoModel.findByIdAndUpdate(id,{is_completed});
            
            res.status(200).send({"msg":"Updated"})
        }
        else {
            res.status(400).send({"msg":err})
        }
      });
    
})
todoRouter.delete("/updatetodo", async (req, res) => {
    let token  = req.headers.authorization.split(" ")[1]
    let {id} = req.body
    jwt.verify(token, 'masai', async (err, decoded) => {
        if (decoded) {
            await TodoModel.findByIdAndDelete(id);
            
            res.status(200).send({"msg":"Deleted"})
        }
        else {
            res.status(400).send({"msg":err})
        }
      });
    
})



module.exports = {
    todoRouter
}