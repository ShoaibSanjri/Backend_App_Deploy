const express = require("express");
const {NoteModel} = require("../model/note.model")
const noteRouter = express.Router();

noteRouter.post('/create', async (req, res) => {
    console.log(req.body)
    try {
        let user = await NoteModel(req.body);
        await user.save();
        res.status(200).send({"msg":"New Note has been created !"})
    }
    catch (err) {
        res.status(400).send({'msg':err.message})
    }
});
noteRouter.get('/', async(req, res) => {
    try {
        let user = await NoteModel.find();
        res.send({"msg":user})
    }
    catch (err) {
        res.status(400).send({'msg':err.message})
    }
})

noteRouter.patch("/update/:ID", async (req, res) => {
    let {ID} = req.params
    try {
        await NoteModel.findByIdAndUpdate(ID,req.body);
        res.send({"msg":"User's data has been updated"})
    }
    catch (err) {
        res.status(400).send({'msg':err.message})
    }
})

noteRouter.delete("/delete/:ID", async (req, res) => {
    let {ID} = req.params
    try {
        await NoteModel.findByIdAndDelete(ID);
        res.send({"msg":"User's data has been deleted"})
    }
    catch (err) {
        res.status(400).send({'msg':err.message})
    }
})

module.exports = {
    noteRouter
}