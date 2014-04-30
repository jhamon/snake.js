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
    this.listenTo(this.apples, 'appleDestroyed', this.makeApples);
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
    this.delay = 50;
    this.steps = 0;
    this.timers = {};   // Cache timer ids for later removal.
    this.timers['main'] = window.setInterval(tick, this.delay);
  },

  clearTimers: function () {
    // Clear all timers.  We have to turn these off manually
    // or the game view will never be garbage collected.
    _.each(this.timers, function (timer) {
      window.clearInterval(timer);
      window.clearTimeout(timer);
    });
  },

  remove: function() {
    // Clear timers
    this.clearTimers();

    // Unbind global key events
    this.off('keydown');

    // Boilerplate ganked from backbone.js
    this.$el.off();
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
    this.endAnimation();
  },

  endAnimation: function () {
    var redo = this.endAnimation.bind(this)

    var empties = _.shuffle(this.cells.where({'status':'empty'}));
    this.popAndWait(empties);
  },

  popAndWait: function (list) {
    var game = this;
    _.times(20, function () { game.obstacles.add(list.pop())})
    var popWait = function () {
      game.popAndWait(list);
    }
    if (list.length > 0) {
      setTimeout(popWait, 1);
    } else {
      SnakeGame.router.navigate("#highscores", {trigger: true});
    }
  },

  updateScore: function () {
    var currentScore = SnakeGame.gameState.get('score');
    SnakeGame.gameState.set({ 'score' : currentScore + 1 });
  },

  tick: function () {
    // This is the main game loop action.  The snake's
    // movement triggers a cascade of model events.
    this.steps += 1;
    this.snake.move();
    this.growObstacles();
  },

  growObstacles: function () {
    if (this.turnInToObstacle && this.stepsUntilMakeObstacle === 0) {
      this.obstacles.add(this.turnInToObstacle);
      this.turnInToObstacle = void 0;
    }

    if (this.stepsUntilMakeObstacle) this.stepsUntilMakeObstacle--;
  },

  addObstacle: function () {
    // When we eat an apple, mark the snakes current tail position to 
    // become an obstacle. 
    this.turnInToObstacle = this.snake.tail();
    this.stepsUntilMakeObstacle = 1;
  }
});