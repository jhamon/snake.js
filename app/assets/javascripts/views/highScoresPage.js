SnakeGame.Views.highScoresPage = Backbone.View.extend({
  initialize: function () {
    this.collection = SnakeGame.scores;
    this.collection.fetch();
  },

  template: JST['high_scores_page'],

  render: function () {
    var renderedContent = this.template();

    var addScore = new SnakeGame.Views.addScore(
      { model: new SnakeGame.Models.score() }
    );

    var scoreboard = new SnakeGame.Views.highScoreBoard(
      { collection: SnakeGame.scores }
    );

    this.$('.add-score').html(addScore.render().$el);
    this.$('.scoreboard').html(scoreboard.render().$el);
    return this;
  }
})