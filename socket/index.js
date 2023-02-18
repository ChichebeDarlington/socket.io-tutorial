const express = require("express")
const socket = require("socket.io")

const app = express()

const server = app.listen(5000,()=>{
    console.log("listening to port 5000");
})

// static files
app.use(express.static("../public"))

// socket set up

const io = socket(server)

io.on("connection",(socket)=>{
    // socket in the callback function refers to the particular clients in the client side
    // console.log("socket connection made successfully", socket.id);

    // received data from client
    socket.on("chat",(data)=>{
        // sending data back to all clients
        io.sockets.emit("chat", data)
    })

    socket.on("typing", (data)=>{
        // sending data back to all clients except sender
        socket.broadcast.emit("typing", data)
    })
})