SnakeGame.Models.highScore = Backbone.Model.extend({
  info: 'model:highScore',

  urlRoot: '/high_scores',

  defaults: {
    username: "Anonymous",
    score: 0
  }
})