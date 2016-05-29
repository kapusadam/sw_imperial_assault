
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
        window.onbeforeunload = function(){ trackClose(); }
        
        $urlRouterProvider.otherwise('/home');

        $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                templateUrl: 'pages/home/home.html',
                controller: 'HomeController'
            })

            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('mission', {
                url: '/mission',
                templateUrl: 'pages/mission/mission.html'
            });



    })
