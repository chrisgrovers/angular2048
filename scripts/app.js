var app = angular.module('2048App', [
  // 'ngRoute',
  'board',
  'gameModule',])

app.controller('2048Controller', function(gameFactory) {
  this.game = gameFactory;

  this.newGame = function() {
    // KeyboardService.init();
    this.game.newGame();
    // this.startGame();
  }

  this.startGame = function() {
    var self = this;
    console.log('starting new game');
    // KeyboardService.on(function(key) {
    //   self.game.move(key);
    // })
  }

  this.game.newGame();
})