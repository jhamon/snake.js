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
})