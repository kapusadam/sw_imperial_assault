var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash');
var heroCards = require('./data/heroes.json');
//var hero = require('model/Hero');

app.use('/', express.static(__dirname + '/'));

var players = [];



io.on('connection', function(socket) {


    init();

    socket.on('disconnect', function(){
        console.log('user disconnected, players remaining:',players.length);
    });

    console.log("the heroCards length:",heroCards.length)

    socket.emit('availableHeroCards', heroCards);
    socket.on('chooseHeroCard', function(heroId){
        console.log('heroId ',heroId);
        var hero = _.remove(heroCards, function(hero) {
            return hero.id === heroId;
        });
        console.log("heroCards NEW length:",heroCards.length)
        // socket.emit('heroGained', {hero: hero, heroCards: heroCards});
        socket.emit('availableHeroCards', heroCards);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

var init = function () {

};


