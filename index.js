const express = require("express");
const { connection } = require("./db");
const {userRouter} = require("./routes/user.router");
const { todoRouter } = require("./routes/todo.router");
const app = express();
const {noteRouter} = require("./routes/note.router");
const { auth } = require("./middlewares/auth.middleware");
app.use(express.json())
const cors = require("cors");
require("dotenv").config()
app.use(cors())
app.use("/users", userRouter);


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