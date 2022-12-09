const {Router} = require("express")
const { todosController } = require("../controllers/todos.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const route = Router()

route.get('/', todosController.getTodos)
route.get('/:id', todosController.getTodo)
route.post('/', authMiddleware, todosController.addTodo)
route.patch('/:id', todosController.editTodo)
route.delete('/:id',authMiddleware, todosController.deleteTodo)

module.exports = route