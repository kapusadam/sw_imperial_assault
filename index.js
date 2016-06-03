var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash');
var heroCards = require('./data/heroes.json');
//var hero = require('model/Hero');

app.use('/', express.static(__dirname + '/'));

var players = [];
var gameType;
var playerToCome = 0;
var allClients = [];

io.on('connection', function(socket) {
    allClients.push(socket);
    socket.on('gameType', function(type){
        gameType = type;
        console.log(type);
        init(socket);
        console.log("players, heroCards length:",players.length, heroCards.length);
        socket.emit('availableHeroCards', heroCards);
        chooseHeroCard(socket);
    });

    socket.on('disconnect', function(){
        var index = allClients.indexOf(socket);
        allClients.splice(index, 1);
        var disconnectedPlayer = _.remove(players, 'id', socket.id)[0];
        if (disconnectedPlayer.hero) {
            heroCards.push(disconnectedPlayer.hero);
            socket.broadcast.emit('availableHeroCards', heroCards)
        }
        console.log('user disconnected, players length, hero cards length:',players.length, heroCards.length);
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

var init = function (socket) {
    var player = {id:socket.id, xp:0, turn: players.length === 0};
    players.push(player);
    console.log(player);
    socket.emit('playerInfo', player);
};

var chooseHeroCard = function(socket) {
    
    socket.on('chooseHeroCard', function(result) {
        console.log('heroId ',result.heroId);
        var hero = _.remove(heroCards, function(hero) {
            return hero.id === result.heroId;
        });

        if(hero.length !== 0) {
            console.log("heroCards NEW length:",heroCards.length);
            _.find(players, function(player) {
                if (player.id === result.playerId) {
                    player.hero = hero[0];
                }
            })
            io.sockets.emit('availableHeroCards', heroCards)
        } else {
            console.log('PECH MAR FOGLALT'); //TODO lekezelni majd cliens oldalt
            chooseHeroCard(socket,postfix);
        }
    });
};
