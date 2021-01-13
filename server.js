const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
const { v4:uuidv4   } = require('uuid')
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server,{
    debug:true
})

const PORT = process.env.PORT || 3030

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.use('/peerjs',peerServer)
app.get('/',( req, res ) => {
    res.redirect(`/${uuidv4()}`)
})

app.get('/:room',( req, res ) => {
    const roomID = req.params.room
    res.render('room',{ roomID })
})

io.on('connection', socket => {
    socket.on('join-room',(roomID,userID) => {
        socket.join(roomID)
        socket.to(roomID).broadcast.emit('user-connected',userID)
    })
})

server.listen(PORT,() => 
    console.log(`Listening at http://localhost:${PORT}`)
)