(function() {
  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});

  var Board = SnakeGame.Board = function () {
    this.snake = new SnakeGame.Snake();
    this.apples = [];
    this.gameOver = false;
    this.score = 0;
  };

  Board.BOARD_SIZE = 30;
  Board.KEY_MAPPINGS = { "38": "N",
                         "40": "S",
                         "37": "W",
                         "39": "E" };

  var turn = Board.prototype.turn = function (keyCode) {
    var mappedKey = Board.KEY_MAPPINGS[keyCode];
    if (mappedKey) {
      this.snake.turn(mappedKey);
    }
  };

  var step = Board.prototype.step = function () {
    this.checkApples();
    this.snake.move();
    this.checkCollisions();
  };

  Board.prototype.checkCollisions = function () {
    if (this.snake.isCollidedWithSelf() ||
        this.snake.isCollidedWithWall()) {
      this.gameOver = true;
    }
  }

  Board.prototype.checkApples = function() {
    var applesToDelete = [];

    this.apples.forEach(function (apple, appleIdx) {
     if (this.snake.isCollidedWithApple(apple)) {
        this.makeApples(20);
        this.score += 1;
      }
    }, this);
  };

  Board.prototype.makeApples = function (numApples) {
    this.apples = [];

    for (var i = 0; i < numApples; i++) {
      var xpos = Math.floor(Math.random()*Board.BOARD_SIZE);
      var ypos = Math.floor(Math.random()*Board.BOARD_SIZE);
      this.apples.push(new SnakeGame.Coord(xpos, ypos));
    }
  };

  Board.prototype.reset = function () {
    this.snake = new SnakeGame.Snake();
    this.apples = [];
    this.gameOver = false;
    this.score = 0;
  }

})();