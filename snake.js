(function() {
  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});


  var Snake = SnakeGame.Snake = function () {
    this.dir = "N";
    this.segments = [new SnakeGame.Coord(10, 10)];
    this.appleEaten = false;
  };

  Snake.MOVES = {"N": [0, -1],
                "S": [0, 1],
                "E": [1, 0],
                "W": [-1,0]}

  Snake.prototype.move = function () {
    var newHead = this.nextMove();
    this.segments.unshift(newHead);

    if (!this.appleEaten) {
      this.segments.pop();
    }
    this.appleEaten = false;
  }

  Snake.prototype.turn = function(direction) {
    var illegalDirs = {"N":"S", "S":"N", "E":"W", "W":"E"}
    if (direction !== illegalDirs[this.dir]) {
      this.dir = direction;
    }
  }

  Snake.prototype.head = function() {
    return this.segments[0];
  }

  Snake.prototype.nextMove = function() {
    return this.head().plus(Snake.MOVES[this.dir]);
  }

  Snake.prototype.isCollidedWithApple = function (apple) {
    if ((this.nextMove().xpos === apple.xpos) && (this.nextMove().ypos === apple.ypos)) {
      this.appleEaten = true;
      return true;
    }
    return false;
  }

})();