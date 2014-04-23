SnakeGame.Views.highScoresPage = SnakeGame.Views.base.extend({
  info: 'view:highScoresPage',

  className: 'page',

  events: {
    'click .reset': 'playAgain'
  },

  template: JST['high_scores_page'],

  render: function () {
    var score = (SnakeGame.gameState && SnakeGame.gameState.get('score')) || 0;
    var renderedContent = this.template({score: score});
    this.$el.html(renderedContent);

    var addScore = new SnakeGame.Views.addScoreView(
      { model: SnakeGame.gameState }
    );

    var scoreboard = new SnakeGame.Views.highScoreBoard(
      { collection: SnakeGame.scores }
    );

    this.$('.add-score').html(addScore.render().$el);
    this.$('.scoreboard').html(scoreboard.render().$el);
    return this;
  },

  playAgain: function () {
    SnakeGame.router.navigate("#play", {trigger: true});
  }
})