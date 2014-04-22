SnakeGame.Collections.highScores = Backbone.Collection.extend({
  model: SnakeGame.Models.highScore,
  url: "/high_scores"
})