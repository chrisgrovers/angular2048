var app = angular.module('2048App', [
  // 'ngRoute',
  'board',
  'gameModule',])

app.controller('2048Controller', function(gameFactory) {
  this.game = gameFactory;

  this.newGame = function() {
    this.game.newGame();
  }

  this.startGame = function() {
    var self = this;
    console.log('starting new game');
  }

  this.game.newGame();
})