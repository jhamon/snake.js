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



})();