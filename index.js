const express = require('express')
const app = express()

app.use(express.json())

app.get("/", (req,res) => {
    res.send("Shree Krishna")
})

const port = 8000


app.listen(port, () => {
    console.log("server has started")
})