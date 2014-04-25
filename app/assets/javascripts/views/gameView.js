SnakeGame.Views.gameView = SnakeGame.Views.base.extend({

  info: 'view:gameView',

  className: 'page',

  BOARD_SIZE: 40,

  template: JST['game_page'],

  initialize: function () {
    // Unfortunately, only document recieves the keypresses.
    $(document).on('keydown', this.turnSnake.bind(this));

    // The game has several nested collections
    this.initCollections();

    // Configure repeating tasks
    this.initTimers();

    this.listenTo(this.apples, 'appleEaten', this.afterAppleEaten);
    this.listenTo(this.snake,  'collision',  this.gameOver);
  },

  afterAppleEaten: function () {
    this.updateScore();
    this.makeApples();
    this.addObstacle();
  },

  initCollections: function () {
    // Cells represent the different squares of the gameboard.
    this.cells = new SnakeGame.Collections.cells([], {size: this.BOARD_SIZE});  
    this.cells.populate();

    // Snake, apples and obstacles are special subsets of the cells collection.
    // Breaking them into their own collection classes makes it easier to trigger
    // the necessary actions.
    this.snake = new SnakeGame.Collections.snakeSegments(this.cells.center());
    this.apples = new SnakeGame.Collections.apples();
    this.makeApples(2);
    this.obstacles = new SnakeGame.Collections.obstacles();
  },

  initTimers: function () {
    var tick = this.tick.bind(this);
    this.delay = 70;    // Start the game out slowish.
    this.timers = {};   // Cache timer ids for later removal.
    this.timers['main'] = window.setInterval(tick, this.delay);
    // this.resetAppleCountdown();
  },

  clearTimers: function () {
    // Clear all timers.  We have to turn these off manually
    // or the game view will never be garbage collected.
    _.each(this.timers, function (timer) {
      window.clearInterval(timer);
      window.clearTimeout(timer);
    });
  },
  
  speedUp: function () {
    // We want to speed up, but not too much.
    if (this.delay > 35) {
      this.delay--;
    }

    var tick = this.tick.bind(this);
    window.clearInterval(this.timers['main']);
    this.timers['main'] = window.setInterval(tick, this.delay);
    console.log('Speeding up to ' + 1000 / this.delay + 'fps');
  },

  remove: function() {
    // Clear timers
    this.clearTimers();

    // Unbind global key events
    this.off('keydown');

    // Boilerplate ganked from backbone.js
    this.$el.remove();
    this.stopListening();
    return this;
  },

  render: function () {
    this.$el.html(this.template());
    this.$board = this.$('.board');

    var cellDivs = this.cells.map( function (cell) {
      var cellView = new SnakeGame.Views.cellView({model: cell});
      return cellView.render().$el;
    });

    // jQuery will use a document fragment if you append a list of
    // items instead of doing them individually in the for-loop.
    this.$board.prepend(cellDivs.reverse());
    var scoreView = new SnakeGame.Views.scoreView({model: SnakeGame.gameState })
    this.$('.scoreview').html(scoreView.render().$el);
    return this;
  },

  makeApples: function (numToMake) {
    var appleCount;
    appleCount = (typeof numToMake === 'object') ? 1 : (numToMake || 1)

    for (var a = 0; a < appleCount; a++) {
      this.apples.add(this.cells.sample());
    }
  },

  KEY_MAPPINGS: { 
                  '38': 'N', '40': 'S', '37': 'W', '39': 'E', // arrow keys
                  '75': 'N', '74': 'S', '72': 'W', '76': 'E', // vim hjkl
                  '87': 'N', '83': 'S', '65': 'W', '68': 'E'  // wasd
                },

  turnSnake: function (e) {
    var mappedKey = this.KEY_MAPPINGS[e.keyCode];
    if (mappedKey) {
      this.snake.turn(mappedKey);
    }
  },

  gameOver: function () {
    this.clearTimers();
    SnakeGame.router.navigate("#highscores", {trigger: true});
  },

  updateScore: function () {
    var currentScore = SnakeGame.gameState.get('score');
    SnakeGame.gameState.set({ 'score' : currentScore + 1 });
  },

  tick: function () {
    // This is the main game loop action.  The snake's
    // movement triggers a cascade of model events.
    this.snake.move();
    // this.growObstacles();
  },

  addObstacle: function () {
    // Make a few dead pixels, avoiding those squares that
    // are immediately in front of the snake because 
    // nobody likes insta-death.
    this.obstacles.add(this.snake.notInDirectPath());
  }
});