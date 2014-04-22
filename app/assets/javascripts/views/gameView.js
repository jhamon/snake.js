SnakeGame.Views.gameView = Backbone.View.extend({

  info: 'view:gameView',

  initialize: function () {
    // Only document recieves the keypresses.
    $(document).on('keydown', this.turnSnake.bind(this));

    this.score = new Backbone.Model({ score: 0 });

    this.cells = new SnakeGame.Collections.cells([], {size: this.BOARD_SIZE});  
    this.cells.populate();

    this.snake = new SnakeGame.Collections.snakeSegments(this.cells.sample());
    this.listenTo(this.snake, 'collision', this.gameOver);

    this.apples = new SnakeGame.Collections.apples();
    this.makeApples(2);

    this.listenTo(this.apples, 'appleEaten', this.updateScore);
    this.listenTo(this.apples, 'appleEaten', this.makeApples);

    // Configure repeating tasks
    this.gametimers = [];
    var loop = this.step.bind(this);
    var refreshApples = this.refreshApples.bind(this);
    this.gametimers.push(window.setInterval(loop, 50));
    this.gametimers.push(window.setInterval(refreshApples, 10000));
  },
  
  BOARD_SIZE: 40,


  template: JST['game_page'],

  remove: function() {
    // Clear timers
    _.each(this.gametimers, function (timer) {
      window.clearInterval(timer);
    });

    // Unbind key events
    this.off('keydown');

    // boilerplate ganked from backbone.js
    this.$el.remove();
    this.stopListening();
    return this;
  },

  render: function () {
    this.$el.html(this.template());
    this.$board = this.$('.board');

    this.cells.forEach( function (cell) {
      var cellView = new SnakeGame.Views.cellView({model: cell});
      this.$board.prepend(cellView.render().$el);
    }, this);

    var scoreView = new SnakeGame.Views.scoreView({model: this.score })
    this.$('.scoreview').html(scoreView.render().$el);
    return this;
  },

  makeApples: function (numToMake) {
    var appleCount;
    appleCount = (typeof numToMake === 'object') ? 1 : (numToMake || 1)

    for (var a = 0; a < appleCount; a++) {
      // console.log("making one apple")
      this.apples.add(this.cells.sample());
    }
  },

  KEY_MAPPINGS: { '38': 'N',
                  '40': 'S',
                  '37': 'W',
                  '39': 'E' },

  turnSnake: function (e) {
    var mappedKey = this.KEY_MAPPINGS[e.keyCode];
    if (mappedKey) {
      this.snake.turn(mappedKey);
    }
  },

  gameOver: function () {
    _.each(this.gametimers, function (timer) {
      window.clearInterval(timer);
    })
  },

  updateScore: function () {
    this.score.set({ 'score' : this.score.get('score') + 1 });
    console.log('score updated:' + this.score.get('score'));
  },

  step: function () {
    this.snake.move();
  },

  refreshApples: function () {
    this.apples.empty();
    this.makeApples(2);
  }
});