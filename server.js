const express = require("express")
const app = express()
const dotenv = require("dotenv");
const cors = require('cors');
const connectDB = require("./config/db");
const Chat = require("./chat.schema");
const path = require("path");
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Load env vars
dotenv.config({ path: "./config/.env" });
// Connect to database
connectDB();

// Body parser
app.use(express.json());

app.use(cors())

app.use(express.static('angular'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'angular/index.html'))
})

app.get('/allMessages', async (req, res) => {
    try {
        let messages = await Chat.find()
        res.send({
            success: true,
            messages
        })
    } catch (error) {
        console.log('allMessages error', error)
    }
})

let port = process.env.PORT || 3000
let users = 0;

io.sockets.on('connection', async (socket) => {
    console.log('new user connection');
    users++

    socket.on('sendMessage', (data) => {
        let newMessage = new Chat(data)
        newMessage.save().then(() => {
            socket.broadcast.emit('newMessage', data)
        }).catch((error) => {
            console.log('error', error)
        })
    })

    let messages = await Chat.find()
    socket.timeout(2000).emit('getAllMessage', messages)

    io.sockets.emit('getTotalOnlineUser', users)

    socket.on('disconnect', () => {
        console.log('user is disconnected!')
        users--
        io.sockets.emit('getTotalOnlineUser', users)
    })

});

http.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
