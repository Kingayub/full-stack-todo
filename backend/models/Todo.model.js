const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    complited: {
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo