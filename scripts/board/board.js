var board = angular.module('board', [])

board.service('BoardService', function() {
  var board = {};
  board.rows = [];
  board.boardSize = 4;
  board.add = 0;


  board.addTile = function() {
    // should generate a number (2 or 4) in random spot in board
    var numToAdd = Math.random() < 0.9 ? 2 : 4;
    var spotsArr = board.findEmpty();
    if (spotsArr.length === 0) {
      console.log('no more spots!');
      return false;
    } else {
      var spot = spotsArr[Math.floor(Math.random() * spotsArr.length)];
      board.rows[spot.x].spots[spot.y].value = numToAdd; 
      return true;
    }
  }

  board.clearBoard = function() {
    for (var i = 0; i < board.boardSize; i++) {
      for (var j = 0; j < board.boardSize; j++) {
        board.rows[i].spots[j].value = undefined;
      }
    }
  }

  board.moveTile = function(spot, xOry, plusOrMinus) {
    var axis = xOry ? 'x' : 'y';
    var operator = {
      '+': function(coord) {
        return coord + 1
      },
      '-': function(coord) {
        return coord - 1
      }
    }

    var cloneTile = function(tile) {
      var holder = {};
      holder.value = board.rows[tile.x].spots[tile.y].value;
      holder.x = board.rows[tile.x].spots[tile.y].x;
      holder.y = board.rows[tile.x].spots[tile.y].y;
      return holder;
    }

    var temp = cloneTile(spot);

    board.rows[temp.x].spots[temp.y].value = undefined;

    while (board.rows[temp.x].spots[temp.y].value !== null) {
      var nextSpot = cloneTile(temp);
      nextSpot[xOry] = operator[plusOrMinus](nextSpot[xOry]);
      
      if (nextSpot[xOry] >= board.boardSize || nextSpot[xOry] < 0) {
        break;
      } else {
        var holder = cloneTile(nextSpot);
        if (holder.value !== undefined && holder.value !== temp.value) {
          break;
        } else if (holder.value === temp.value) {
          // console.log('board.add', board.add);
          console.log('yoyoyo')
          temp.value = temp.value * 2;
          board.add += temp.value;
          temp[xOry] = holder[xOry]
          break;
        }

      }
      temp[xOry] = nextSpot[xOry];
    }
    board.rows[temp.x].spots[temp.y].value = temp.value;
    if (spot.x === temp.x && spot.y === temp.y) {
      return false;
    } else {
      return true;
    }
  }

  board.findEmpty = function() {
    var available = [];
    for (var i = 0; i < board.rows.length; i++) {
      available = available.concat(board.rows[i].spots.filter(function(spot) {
        return spot.value === undefined;
      }))
    }
    return available;
  }

  board.findTiles = function(cb) {
    var tiles = [];
    cb(function(elem) {
      if (elem.value !== undefined) {
        tiles.push(elem);
      }
    })
    return tiles;
  }

  board.move = function(direction) {
    board.add = 0;
    var tiles = this.findTiles(direction.traverse);
    var okayToAdd = false;

    for (var i = 0; i < tiles.length; i++) {
      var addTiles = board.moveTile(tiles[i], direction.axis, direction.plusOrMinus)
      if (addTiles) {
        okayToAdd = true;
      }
    }
    if (okayToAdd) {
      this.addTile()
    }
  }

  board.startNewGame = function() {
    // make array of available spots on board
    board.clearBoard();

    board.addTile();
    board.addTile();
  }

  

  for (var i = 0; i < board.boardSize; i++) {
    var row = {};
    row.spots = [];
    for (var j = 0; j < board.boardSize; j++) {
      var gridCell = {};
      gridCell.value = null;
      gridCell.x = i;
      gridCell.y = j;
      if (i === 2) {
        gridCell.value = 2;
      }
      row.spots.push(gridCell);
    }
    board.rows.push(row);
  }

  return board
})

board.directive('board', function() {
  return {
    restrict: 'A',
    templateUrl: 'scripts/board/board.html'
  }
})