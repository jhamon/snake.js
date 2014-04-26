SnakeGame.Models.NoUrlModel = Backbone.Model.extend({});
SnakeGame.Models.NoUrlModel.prototype.sync = function() { return null; };
SnakeGame.Models.NoUrlModel.prototype.fetch = function() { return null; };
SnakeGame.Models.NoUrlModel.prototype.save = function() { return null; };

SnakeGame.Models.cell = SnakeGame.Models.NoUrlModel.extend({
  info:'model:cell',

  defaults: {
    status: 'empty',
    x: undefined,
    y: undefined
  },

  plus: function (vector) {
    // This utility function gives the cell reached
    // from the current location (this) if traveling
    // in the direction specified by `vector`.
    var dx = vector[0];
    var dy = vector[1];

    var newX = this.get("x") + dx;
    var newY = this.get("y") + dy;
    return this.collection.cellAtXY(newX, newY);
  },
});