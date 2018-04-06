var express = require('express');
var app =express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.on('connection', function(socket){

socket.on('join',function(res){
    console.log('One user joined..')
    socket.join(res.room)
    socket.broadcast.to(res.room).emit('new_joinee',{user : res.name,message : ' has joined room '})
})

socket.on('new_message',function(data){
    io.in(data.room).emit('chat_msg',{user : data.user,message : data.msg})
})

socket.on('exit_room',function(res){
    socket.leave(res.room)
    socket.broadcast.to(res.room).emit('user_exit',{user : res.user,message : ' has left the room'})
})

})

server.listen(3001,function(){
    console.log("Connection to server");

})



