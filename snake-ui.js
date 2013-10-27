console.log("Think this is cool? Get in touch at jhamon@gmail.com");

(function () {
  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});

  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
  };

  var adjustCSS = function () {
    var width = window.innerWidth;
    var tileSize = (window.innerHeight-200)/30;
    var marginTop = (window.innerHeight - tileSize*30-60)/2
    $('.board').css('margin', marginTop);
    $('.board').css('width', tileSize*30+60);
    $('.board').css('height', tileSize*30+31);
    $('.tile').css('width', tileSize);
    $('.tile').css('height', tileSize);
    $('.sidebar').css('margin-top', marginTop);
    $('.score').css('margin-top', marginTop);
    if (parseInt($('.board').css('width')) > 0.6*width) {
      $('.sidebar').hide();
    } else {
      $('.sidebar').show();
    }
  }

  $(".reset").on("click", start)

  window.onresize = adjustCSS;

  var start = View.prototype.start = function () {
    this.setup();
    adjustCSS();

    this.board = new SnakeGame.Board();
    this.board.makeApples(2);

    var that = this;

    $('body').on("keydown", function (event) {
      that.board.turn(event.keyCode);
    });

    var taunts = ["My grandmother could do better than that.",
                  "If at first you don't succeed...",
                  "Are you even trying?",
                  "It works better if you don't crash."];

    var congratulations = ["Nicely done.", "You rock."]

    var that = this;
    var timer = window.setInterval(function(){
      if (!that.board.gameOver) {
        that.board.step();
        that.redraw();
      } else {
        window.clearInterval(timer);
        $('#overlay').css("visibility", "visible")

        if (that.board.score < 10) {
          $('#overlay > div').prepend("<p>"+ _.sample(taunts) + "</p>")
        } else {
          $('#overlay > div').prepend("<p>"+ _.sample(congratulations) + "</p>")
        }

      }
    }, 70);
  };

  var setup = View.prototype.setup = function () {
    for(var i = 0; i < SnakeGame.Board.BOARD_SIZE; i++) {
      for(var j = 0; j < SnakeGame.Board.BOARD_SIZE; j++) {
        var $tile = $("<div class='tile'></div>");
        $tile.attr("data-row", i);
        $tile.attr("data-col", j);
        this.$el.append($tile);
        $('#overlay').css("visibility", "hidden")
      }
    }
  }

  var redraw = View.prototype.redraw = function () {
    $(".snake").removeClass("snake");
    $(".apple").removeClass("apple");
    $(".score").html("Score: " + this.board.score)

    var apples = this.board.apples;
    for (var i = 0; i < apples.length; i++) {
      var $appleTile = $('div[data-row='+apples[i].ypos+'][data-col='+apples[i].xpos+']');
      $appleTile.addClass('apple');
    }

    var segments = this.board.snake.segments;
    for (var i = 0; i < segments.length; i++) {
      var $snakeTile = $('div[data-row='+segments[i].ypos+'][data-col='+segments[i].xpos+']');
      $snakeTile.addClass('snake');
      $snakeTile.removeClass('apple');
    }
  }


})();