const express = require("express")
const axios = require("axios")
require("dotenv").config()
const app = express()

app.get('/', (req, res) =>{
    res.send("server test")
})

var cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const articleRouter = require("./routes/articles")
app.use("/articles", articleRouter)

const chatbotRouter = require("./routes/chatbot")
app.use("/chatbot", chatbotRouter)


app.listen(8000, () => console.log("Server Running On Port 8000"))

