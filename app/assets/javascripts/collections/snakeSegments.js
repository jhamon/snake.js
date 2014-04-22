SnakeGame.Collections.snakeSegments = Backbone.Collection.extend({
  info: 'collection:snake',

  model: SnakeGame.Models.cell,

  initialize: function () {
    this.bind('add', this.markAsSnake, this);
    this.bind('remove', this.markAsEmpty, this);
    this.dir = _.sample(Object.keys(this.vectors));
  },

  markAsSnake: function (model) {
    var oldStatus = model.get('status');
    if (oldStatus !== 'apple') {
      // To simulate snake movement, we pop the tail off
      // when adding the head.  To "grow" after eating
      // an apple, we skip the tail pop.
      this.pop();
    } else {
      model.trigger('appleEaten', model);
    }

    model.set({'status':'snake'});
  },

  markAsEmpty: function (model) {
    // When removing a cell from the snake,
    // we need to mark it as empty.
    model.set({'status':'empty'});
  },

  vectors: {
    'N': [0, 1],
    'S': [0, -1],
    'E': [1, 0],
    'W': [-1,0]
  },

  illegalDirs: {
    'N':'S', 
    'S':'N', 
    'E':'W', 
    'W':'E'
  },

  move: function () {
    var next = this.nextMove();
    this.checkCollisions(next);
    this.unshift(next);

    this.lastDir = this.dir;
  },

  turn: function(direction) {
    if (direction !== this.illegalDirs[this.lastDir]) {
      this.dir = direction;
    }
  },

  head: function() {
    return this.at(0);
  },

  nextMove: function() {
    var val = this.head().plus(this.vectors[this.dir]);
    return val;
  },

  checkCollisions: function (next) {
    if (this.isCollidedWithWall(next) ||
        this.isCollidedWithSelf(next)) {
      this.trigger('collision');
      console.log("snake says: collision!")
    }
  },

  isCollidedWithSelf: function (next) {
    return next.get('status') === 'snake';
  },

  isCollidedWithWall: function (next) {
    return next === false;
  }

})