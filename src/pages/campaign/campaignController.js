'use strict';

angular.module('sw')
    .controller('CampaignController',  function($scope, $state, campaignService, myConfig) {
        myConfig.socket.emit('gameType', 'campaign');
        console.log('CampaignController');
        myConfig.socket.on('playerInfo', function(player) {
            myConfig.player = player;
            console.log(player);
        });

        var getHeroCards = function() {
            console.log('getHeroCards');
            return campaignService.getAvailableHeroCards().then(function(heroCards) {
                $scope.availableHeroCards = heroCards;
                console.log(heroCards);
                $scope.$digest();
            });
        };

      var avaibHero = function() {
          myConfig.socket.on('availableHeroCards', function(heroCards){

              $scope.availableHeroCards = heroCards;
              console.log(heroCards);
              $scope.$digest();


              if(!myConfig.player.turn) {
                //  myConfig.socket.emit(emitString, null);
              }

          });
      }

        avaibHero();


        $scope.chooseHero = function(heroId) {
            if($scope.hero) {
                alert('You have already chose a hero');
                return;
            }
            if(!myConfig.player.turn) {
                //alert('Nem te jossz');
               // return;
            }
            
            var emitString = 'chooseHeroCard_'+myConfig.player.id;
            console.log(emitString);
            myConfig.socket.emit(emitString, heroId);

            $scope.hero = _.find($scope.availableHeroCards, function(hero) {
                return hero.id === heroId;
            });

          //  avaibHero();
        }
    });