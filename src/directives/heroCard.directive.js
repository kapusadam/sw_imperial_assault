
angular.module('sw').directive('heroCard',  function () {
    return {
        restrict : "AE",
        controllerAs: 'hc',
        transclude:true,
        templateUrl:"./cell.tpl.html",
        controller:function($scope) {

            console.log('hero-card');

        },
        scope:{
            id:''
        }

    };
});

