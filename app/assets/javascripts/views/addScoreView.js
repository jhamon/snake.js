SnakeGame.Views.addScoreView = Backbone.View.extend({
  template: JST['add_score_form'],

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  events: {
    'click .save-score':'createScore'
  },

  createScore: function (e) {
    e.preventDefault();
    var username = this.$('form.save-score-form input').val();
    SnakeGame.gameState.set({"username": username});
    SnakeGame.gameState.save();
    SnakeGame.scores.add(SnakeGame.gameState);

    // Reset this variable in case they want to play again.
    SnakeGame.gameState = new SnakeGame.Models.highScore();
  }
})