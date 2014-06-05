var buttons = angular.module("egButtons", []);

buttons.directive("egToggleButton", function () {
    return {
        restrict: "E",
        templateUrl: "templates/egToggleButton.html"
    }
})
