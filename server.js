const express = require('express')
const app = express()
const server = require('http').Server(app)
const { v4:uuidv4   } = require('uuid')
const path = require('path')

const PORT = process.env.PORT || 3030

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/',( req, res ) => {
    res.redirect(`/${uuidv4()}`)
})

app.get('/:room',( req, res ) => {
    const roomID = req.params.room
    res.render('room',{ roomID })
})

server.listen(PORT,() => 
    console.log(`Listening at http://localhost:${PORT}`)
)