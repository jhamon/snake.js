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
    this.lastDir = this.dir;
  }

  Snake.prototype.turn = function(direction) {
    var illegalDirs = {"N":"S", "S":"N", "E":"W", "W":"E"}
    if (direction !== illegalDirs[this.lastDir]) {
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
    var nextMove = this.nextMove();
    if (apple.isEqual(nextMove)) {
      this.appleEaten = true;
      return true;
    }
    return false;
  }

  Snake.prototype.isCollidedWithSelf = function () {
    var nextMove = this.nextMove();
    var hitSelf = false;
    this.segments.forEach( function (segment, idx) {
      if (segment.isEqual(nextMove)) {
        hitSelf = true;
      }
    });
    return hitSelf;
  }

  Snake.prototype.isCollidedWithWall = function () {
    return !this.nextMove().isValid();
  }

})();