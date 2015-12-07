angulard.module('Board')
.directive('board', function() {
  return {
    restrict: 'A',
    templateUrl: 'scripts/board/board.html'
  }
})