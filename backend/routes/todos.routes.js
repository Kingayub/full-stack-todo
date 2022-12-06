const {Router} = require("express")
const { todosController } = require("../controllers/todos.controller")

const route = Router()

route.get('/', todosController.getTodos)
route.get('/:id', todosController.getTodo)
route.post('/', todosController.addTodo)
route.patch('/:id', todosController.editTodo)
route.delete('/:id', todosController.deleteTodo)

module.exports = route