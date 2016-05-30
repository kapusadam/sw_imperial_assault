'use strict';

angular.module('sw')
    .controller('CampaignController',  function($scope, $state, campaignService, myConfig) {

        var getHeroCards = function() {
            campaignService.getAvailableHeroCards().then(function(heroCards) {
                $scope.availableHeroCards = heroCards;
                $scope.$digest();
            });
        };

        getHeroCards();

        $scope.chooseHero = function(heroId) {
            if($scope.hero) {
                alert('You have already chose a hero');
                return;
            }

            myConfig.socket.emit('chooseHeroCard', heroId);
            $scope.hero = _.find($scope.availableHeroCards, function(hero) {
                return hero.id === heroId;
            });

            getHeroCards();
        }
    });