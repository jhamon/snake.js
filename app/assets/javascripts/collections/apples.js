SnakeGame.Collections.apples = SnakeGame.Collections.cells.extend({
  model: SnakeGame.Models.cell,

  info: 'collection:apples',

  initialize: function () {
    this.listenTo(this, 'add', this.markAsApple);
    this.listenTo(this, 'appleEaten', this.eatApple);
  },

  markAsApple: function (model) {
    model.set({'status':'apple'});
  },

  eatApple: function (model) {
    this.remove(model);
  },

  empty: function () {
    this.forEach( function (apple) {
      apple.set({'status':'empty'});
      this.remove(apple);
    }, this);
  }
})