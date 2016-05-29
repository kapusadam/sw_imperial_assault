var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash');

//var hero = require('model/Hero');

app.use('/', express.static(__dirname + '/'));

var players = [];
var socket;

io.on('connection', function(sock){
    socket = sock;

    disconnect_on();

    console.log("players length:",players.length)

    ok_emit();
    
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

var disconnect_on = function () {
    socket.on('disconnect', function(){
        console.log('user disconnected, players remaining:',players.length);
    });
};

var ok_emit = function(){

    socket.emit('ok', function(msg){
        console.log("ok:",msg)
    });
};

