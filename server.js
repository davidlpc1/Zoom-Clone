const express = require('express')
const app = express()
const server = require('http').Server(app)
const PORT = process.env.PORT || 3030

app.get('/',( req, res ) => {
    res.status(200).send("Hello World")
})

server.listen(PORT,() => 
    console.log(`Listening at http://localhost:${PORT}`)
)