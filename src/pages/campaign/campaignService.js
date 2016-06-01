angular.module('sw').service('campaignService',  function (myConfig) {

    this.getAvailableHeroCards = function() {
        return new Promise(function(resolve, reject) {
            myConfig.socket.on('availableHeroCards', function(heroCards){
                console.log('on', heroCards);

                resolve(heroCards);
            });
        });
    };

});