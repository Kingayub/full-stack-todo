const Todo = require("../models/Todo.model")

module.exports.todosController = {
    getTodos: async (req,res)=> {
        try {
            const todos = await Todo.find()
            res.json(todos)
        } catch (error) {
            res.json({error:error.message})
        }
    },
    addTodo: async (req,res)=> {
        try {
            const todo = await Todo.create({
                title: req.body.title,
            })
            res.json(todo)
        } catch (error) {
            res.json({error:error.message})
        }
    },
    editTodo: async (req,res)=> {
        try {
            const todo = await Todo.findByIdAndUpdate(req.params.id, {
                complited: req.body.complited
            }, {new:true})
            return res.json(todo)
        } catch (error) {
            res.json({error:error.message})
        }
    },
    deleteTodo: async (req,res)=> {
        try {
            await Todo.findByIdAndDelete(req.params.id)
            res.json("Todo deleted")
        } catch (error) {
            res.json({error:error.message})
        }
    },
    getTodo: async (req,res)=> {
        try {
            const todo = Todo.findById(req.params.id)
            res.json(todo)
        } catch (error) {
            res.json({error:error.message})
        }
    }
}