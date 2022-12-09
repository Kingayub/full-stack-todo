const express = require("express")
require('dotenv').config()
const cors = require("cors");
const mongoose = require("mongoose")
const app = express()
const PORT = process.env.PORT
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json())

app.use(require('./routes/todos.route'))
app.use(require('./routes/users.route'))
mongoose.connect(process.env.MONGO)

app.listen(PORT, ()=> {
    console.log(`PORT ${PORT} get started success`)
})