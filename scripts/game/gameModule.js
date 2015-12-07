angular.module('gameModule', ['board'])
.factory('gameFactory', function(BoardService) {
  var game = {};
  var board = BoardService;
  game.score = 0;
  game.highScore = 0;
  game.board = BoardService;
  game.directions = {
    'Up': {
      forward: true,
      axis: 'x',
      plusOrMinus: '-',
      traverse: function(cb) {
        for (var i = 0; i < board.boardSize; i++) {
          for (var j = 0; j < board.boardSize; j++) {
            cb(board.rows[i].spots[j])
          }
        }
      }

    },
    'Right': {
      forward: true,
      axis: 'y',
      plusOrMinus: '+',
      traverse: function(cb) {
        for (var i = board.boardSize - 1; i >= 0; i--) {
          for (var j = 0; j < board.boardSize; j++) {
            cb(board.rows[j].spots[i])
          }
        }
      }

    },
    'Left': {
      forward: false,
      axis: 'y',
      plusOrMinus: '-',
      traverse: function(cb) {
        for (var i = 0; i < board.boardSize; i++) {
          for (var j = 0; j < board.boardSize; j++) {
            cb(board.rows[j].spots[i])
          }
        }
      }

    },
    'Down': {
      forward: false,
      axis: 'x',
      plusOrMinus: '+',
      traverse: function(cb) {
        for (var i = board.boardSize - 1; i >= 0 ; i--) {
          for (var j = 0; j < board.boardSize; j++) {
            cb(board.rows[i].spots[j])
          }
        }
      }

    }
  }

  game.handleDirection = function(e) {
    var direction = game.directions[e.keyIdentifier];
    if (direction) {
      e.preventDefault();
      board.move(direction);
      console.log('direction!')
    }
    console.log('board.add is', board.add);

    game.updateScore(board.add);
  }

  game.newGame = function() {
    this.score = 0;
    board.startNewGame();

  }

  game.updateScore = function(newScore) {
    game.score += newScore;
    if (game.score > game.highScore) {
      game.highScore = game.score;
    }

  }

  return game;
})