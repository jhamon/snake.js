SnakeGame.Collections.obstacles = Backbone.Collection.extend({
  info: 'collection:obstacles',

  model: SnakeGame.Models.cell,

  initialize: function (models) {
    this.listenTo(this, 'add', this.addStatus);
    this.listenTo(this, 'remove', this.removeStatus);
  },

  addStatus: function (model) {
    model.set({'status' : 'obstacle'});
  },

  removeStatus: function (model) {
    model.set({'status' : 'empty'});
  }
})