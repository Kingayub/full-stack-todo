const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const router = Router();

router.get("/users/all", usersController.getAllUsers);
router.post("/users", usersController.registerUser);
router.post("/login", usersController.loginization);

module.exports = router;
