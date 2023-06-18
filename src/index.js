//imports
import express from "express";
import {Server as SocketServer} from 'socket.io';
import http from "http";


//initialization
const app = express();
const server = http.createServer(app);

const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:5173'
    },
});



const PORT = 3001;

//config

io.on('connection', socket =>{
    console.log(socket.id)
    socket.on('message', (body)=>{
        socket.broadcast.emit('message', {
            body,
            from:socket.id.slice(6),
        })
    })
} )


//middleware


// app.use(express.json());
// //routes

// app.get('/', (req,res)=>{
//     console.log('Hola mundo');
//     res.send('Hola')
// });


//listening
server.listen(PORT, ()=>{
    console.log(`The app is listening on port ${PORT}`)
})