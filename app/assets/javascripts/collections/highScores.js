SnakeGame.Collections.highScores = Backbone.Collection.extend({
  info: 'collection:highScores',
  model: SnakeGame.Models.highScore,
  url: '/high_scores'
})