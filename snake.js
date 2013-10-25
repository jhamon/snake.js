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
    var currentHead = this.segments[0];
    var newHead = currentHead.plus(Snake.MOVES[this.dir]);
    this.segments.unshift(newHead);

    if (!this.appleEaten) {
      this.segments.pop();
    }
    this.appleEaten = false;
  }

  Snake.prototype.turn = function(direction) {
    this.dir = direction;
  }

  Snake.prototype.head = function() {
    return this.segments[0];
  }

  Snake.prototype.isCollidedWith = function (apple) {
    if ((this.head().xpos === apple.xpos) && (this.head().ypos === apple.ypos)) {
      this.appleEaten = true;
      return true;
    }
    return false;
  }

})();