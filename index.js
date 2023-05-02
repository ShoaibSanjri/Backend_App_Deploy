const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors())
const { connection } = require("./db");

const {userRouter} = require("./routes/user.router");
const { todoRouter } = require("./routes/todo.router");
const {noteRouter} = require("./routes/note.router");
const { auth } = require("./middlewares/auth.middleware");
app.use(express.json())

require("dotenv").config()

app.use("/users", userRouter);

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*")
//     next()
//   }) 
app.use('/todos',todoRouter)

app.use(auth)
app.use('/note',noteRouter)
app.get("/", (req, res) => {
    res.send({"msg":"HomePage"})
})



app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("connected to db")
    }
    catch (err) {
        console.log("err",err)
    }
    console.log(`server is running on ${process.env.PORT}`)
})