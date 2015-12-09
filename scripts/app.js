var app = angular.module('2048App', [
  'ngCookies',
  'board',
  'gameModule',])

app.controller('2048Controller', function(gameFactory, $cookies) {
  this.game = gameFactory;
  this.cookies = $cookies.get('cookies') || {

  };


  this.newGame = function(cookies) {
    console.log('cookies are', cookies)
    this.game.newGame(cookies);
  }

  this.startGame = function() {
    var self = this;
    console.log('starting new game');
  }

  this.game.newGame(this.cookies);


})