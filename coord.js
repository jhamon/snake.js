(function() {
  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});


  var Coord = SnakeGame.Coord = function (xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
  };

  Coord.prototype.plus = function (arr) {
    // factory method.
    return new Coord(this.xpos + arr[0], this.ypos + arr[1]);
  }

  Coord.prototype.isEqual = function (coord) {
    return ((coord.xpos === this.xpos) && (coord.ypos === this.ypos));
  }

  Coord.prototype.isValid = function () {
    if (_.contains(_.range(SnakeGame.Board.BOARD_SIZE), this.xpos) &&
        _.contains(_.range(SnakeGame.Board.BOARD_SIZE), this.ypos)){
      return true;
    } else {
      return false;
    }
  }



})();