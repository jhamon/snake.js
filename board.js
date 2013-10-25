(function() {
  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});

  var Board = SnakeGame.Board = function () {
    this.snake = new SnakeGame.Snake();
    this.apples = [];
    this.gameOver = false;
  };

  Board.BOARD_SIZE = 20;
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

  var counter = 0;
  var step = Board.prototype.step = function () {
    counter += 1;
    if (counter % 100 === 0) {
      this.makeApples(5);
    }
    this.checkApples();
    this.checkWall();
    this.checkSelf();
    this.snake.move();
  };

  Board.prototype.checkSelf = function() {

  }

  Board.prototype.checkWall = function() {
    var nextHead = this.snake.head().plus(SnakeGame.Snake.MOVES[this.snake.dir]);
    if (!_.contains(_.range(SnakeGame.Board.BOARD_SIZE), nextHead.xpos) ||
          !_.contains(_.range(SnakeGame.Board.BOARD_SIZE), nextHead.ypos)){
            this.gameOver = true;
    }
  };

  Board.prototype.checkApples = function() {
    var applesToDelete = [];
    for (var i = 0; i < this.apples.length; i++) {
      if (this.snake.isCollidedWith(this.apples[i])) {
        applesToDelete.push(i);
        console.log("Hi");
      }
    }

    for (var i = 0; i < applesToDelete.length; i++) {
      this.apples.splice(applesToDelete[i], 1);
    }
  };


  var makeApples = Board.prototype.makeApples = function (numApples) {
    this.apples = [];

    for (var i = 0; i < numApples; i++) {
      var xpos = Math.floor(Math.random()*20);
      var ypos = Math.floor(Math.random()*20);
      this.apples.push(new SnakeGame.Coord(xpos, ypos));
    }
  };


})();