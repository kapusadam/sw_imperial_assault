var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash');
var heroCards = require('./data/heroes.json');
//var hero = require('model/Hero');

app.use('/', express.static(__dirname + '/'));

var players = [];
var playerToCome = 0;


io.on('connection', function(socket) {


    init(socket);

    // socket.on('disconnect', function(){
    //     console.log('user disconnected, players remaining:',players.length);
    // });

    console.log("players, heroCards length:",players.length, heroCards.length)
if(players.length < 3) {
    console.log('nincs meg meg mindenki');
   // return;
}
    socket.emit('availableHeroCards', heroCards);

    
    for(var i = 1; i<2;++i) {
        chooseHeroCard(socket,i);
    }
    console.log('Mindenki valaszott');
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
        console.log("heroCards NEW length:",heroCards.length)
        // socket.emit('heroGained', {hero: hero, heroCards: heroCards});
        socket.emit('availableHeroCards', heroCards);
    });
}


