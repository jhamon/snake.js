(function () {
  'use strict';

  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});
  
  SnakeGame.Collections.highScores = Backbone.Collection.extend({
    info: 'collection:highScores',
    model: SnakeGame.Models.highScore,
    url: '/high_scores',
    comparator: function (score) {
      return -score.get('score');
    }
  });
})();