SnakeGame.Collections.cells = Backbone.Collection.extend({
  model: SnakeGame.Models.cell,

  initialize: function(models, options) {
    this.size = options.size;
  },

  populate: function () {
    var cell, cellAttr;
    for (var x = 0; x < this.size; x++) {
      for (var y = 0; y < this.size; y++) {
        cellAttr = {'x': x,'y': y}
        cell = new SnakeGame.Models.cell(cellAttr);
        this.add(cell);
      }
    }
    return this;
  }
})