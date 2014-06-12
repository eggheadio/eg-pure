var buttons = angular.module("egButtons", ["egTemplates"]);

buttons.directive("egToggleButton", function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "toggleButton.html",
        require: "ngModel",
        transclude: true,

        link: function (scope, element, attrs, ctrl) {
            var ngModel = ctrl;
            scope.activeClass = "";
            ngModel.$setViewValue(false);

            element.on("click", function () {
                ngModel.$setViewValue(!ngModel.$viewValue);

                scope.activeClass = ngModel.$viewValue ? "pure-button-active" : "";
                scope.$apply();

            });
        }
    };
});