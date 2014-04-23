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

  notInDirectPath: function (vector) {
    // This utility function returns a randomly
    // selected empty cell in the grid that the snake
    // is not on an immediate collision course with.
    var current = this;
    var dx = vector[0];
    var filtered;

    // Directional filter factory.
    var excludeMovementInDirection = function (excludeDir) {
      return function (cell) {
        return cell.get('status') === 'empty' || 
               cell.get(excludeDir) !== current.get(excludeDir);
      }
    }

    if ( dx === 0 ) {
      // x component of movement is zero, so snake is 
      // moving in the y direction.
      filterFunc = excludeMovementInDirection('y');
    } else {
      // y component of movement is zero, so snake is 
      // moving in the x direction.
      filterFunc = excludeMovementInDirection('x');
    }

    filtered = this.collection.filter( filterFunc );
    return _.sample(filtered);
  }
})