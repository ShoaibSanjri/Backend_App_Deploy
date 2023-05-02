const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: String,
    is_completed:Boolean
},{versionKey:false}
)


const TodoModel = mongoose.model("todo", todoSchema);


module.exports = {
    TodoModel
}