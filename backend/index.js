const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")
const app = express()
const PORT = 3001
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json())

app.use(require('./routes/todos.routes'))

mongoose.connect("mongodb+srv://Ayub:Salavdi1994@cluster0.qdi4tkn.mongodb.net/Todo-List?retryWrites=true&w=majority")

app.listen(PORT, ()=> {
    console.log(`PORT ${PORT} get started success`)
})