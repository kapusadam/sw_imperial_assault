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


io.on('connection', function(socket) {

    socket.on('gameType', function(type){
        gameType = type;
        console.log(type);

        init(socket);


        console.log("players, heroCards length:",players.length, heroCards.length)
        if(players.length < 3) {
            console.log('nincs meg meg mindenki');
            // return;
        }
        socket.emit('availableHeroCards', heroCards);


        for(var i = 1; i<2;++i) {
            chooseHeroCard(socket,i);
        }

    });
    



    socket.on('disconnect', function(playerId){
        console.log('playerId', playerId);
        if(playerId) {
            var disconnectedPlayer = _.remove(players, function(player) {
                return player.id === playerId;
            });
            if (disconnectedPlayer.hero) {
                var disconnectedPlayer = _.remove(heroCards, function(heroCard) {
                    return heroCard === disconnectedPlayer.hero.id;
                });
            }
        }
        console.log('user disconnected, players remaining:',players.length, heroCards.length);
    });


});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

var init = function (socket) {
    var player = {id:players.length+1,xp:0,turn: players.length === 0};
    players.push(player);
    console.log(player);
    socket.emit('playerInfo', player);
};


var chooseHeroCard = function(socket,postfix) {
    
    socket.on('chooseHeroCard_' + postfix, function(heroId) {
        console.log('heroId ',heroId);
        var hero = _.remove(heroCards, function(hero) {
            return hero.id === heroId;
        });


        if(hero) {
            console.log("heroCards NEW length:",heroCards.length);
            _.find(players, function(player) {
                if (player.id === postfix) {
                    player.hero = hero;
                }
            })
            // socket.emit('heroGained', {hero: hero, heroCards: heroCards});
            io.sockets.emit('availableHeroCards', heroCards)
        } else {
            console.log('PECH MAR FOGLALT'); //TODO lekezelni majd cliens oldalt
            chooseHeroCard(socket,postfix);
        }


    });
}


