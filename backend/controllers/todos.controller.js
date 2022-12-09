const Todo = require("../models/Todo.model");
const jwt = require("jsonwebtoken");

module.exports.todosController = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addTodo: async (req, res) => {
    try {
      const todo = await Todo.create({
        title: req.body.title,
        user: req.user.id,
      });
      return res.json(todo);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  editTodo: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          complited: req.body.complited,
        },
        { new: true }
      );
      return res.json(todo);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);

      if (todo.user.toString() === req.user.id) {
        await todo.remove();
        return res.json("Todo deleted");
      }
      return res.status(401).json("Ошибка!Нет доступа");
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  getTodo: async (req, res) => {
    try {
      const todo = Todo.findById(req.params.id);
      res.json(todo);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
