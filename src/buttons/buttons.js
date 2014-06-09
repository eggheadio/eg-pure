var buttons = angular.module("egButtons", ["egTemplates"]);

buttons.directive("egToggleButton", function ($templateCache) {
    return {
        restrict: "E",
        templateUrl: "templates/toggleButton.html",
        link: function (scope, element, attrs, ctrl) {
            console.log($templateCache.get("templates/toggleButton.html"));
        }
    }
});
