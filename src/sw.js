
angular.module('sw', ['ui.router'])
    .constant("myConfig", {
        "socket": {},
        "player":null
    })
    .config(function(myConfig, $stateProvider, $urlRouterProvider){
        var socket = io();
        myConfig.socket = socket;

        socket.on('exception', function(msg) {
            console.log("msg", msg)
            switch (msg) {
                case "too many players" :
                    window.location.url = "www.google.com";
                    break;
                case "user quit" :
                    console.log("please redo")
                    break;
            }
        });

        socket.on("ok", function(player){
            console.log('OK!!!');

        });

        function trackClose()
        {
            socket.emit('disconnect', myConfig.player.id);
        }
        window.onbeforeunload = function(){ trackClose(); };
        
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'pages/home/home.html',
                controller: 'HomeController'
            })
            .state('mission', {
                url: '/mission',
                templateUrl: 'pages/mission/mission.html'
            })
            
            .state('campaign', {
                url: '/campaign',
                templateUrl: 'pages/campaign/campaign.html',
                abstract: true
            })

            .state('campaign.start', {
                url: '/campaign-start',
                templateUrl: 'pages/campaign/campaign-start.html',
                controller: 'CampaignController'
            })
            .state('campaign.game', {
                url: '/campaign-game:missionId',
                templateUrl: 'pages/campaign/campaign-game.html',
                controller: 'CampaignController'
            });
    });
