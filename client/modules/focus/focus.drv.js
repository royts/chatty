app.directive('focusOn', function() {
  return function(scope, elem, attr) {
    scope.$on('focusOn', function(e, name) {


      if(name === attr.focusOn) {
        console.log("focusing in: " ,  elem[0]);
        elem[0].focus();
        //elem[0].blur();

      }
    });
  };
});