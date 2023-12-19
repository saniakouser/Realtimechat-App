const http= require("http");
const express=require("express");

const path = require("path");
   const app= express();
   const { Server } = require("socket.io");
   const server=http.createServer(app);
   const port=9000;
   const io=new Server(server);
   const bodyParser= require('body-parser')

   // sockt 
    const user={}
   
   app.use(express.static(path.resolve("./public")))
  
  

    app.get("/",(req,res)=>{
      res.sendFile("/public/index.html")
    })

   
   
   io.on('connection', (socket) => {
    socket.on('new user joined' ,name=>{
      console.log(name)
      user[socket.id]=name;
      socket.broadcast.emit('user-joined',name)
    });
    socket.on('chat message', (message) => {
       console.log(message)
      socket.broadcast.emit('message',{message:message,user:user[socket.id]})
    });
   
  });
   server.listen(port,()=>{
    console.log(`app is listen on ${port}`)
   })



