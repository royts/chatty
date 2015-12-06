angular.module('chatty')
  .directive('focusOn', function ($timeout) {
    return {
      scope: {trigger: '=focusOn'},
      link: function (scope, element) {
        scope.$watch('trigger', function (value) {
          if (value === true) {
            console.log('trigger', value);
            $timeout(function () {
              element[0].focus();
              scope.trigger = false;
            });
          }
        });
      }
    };
  });