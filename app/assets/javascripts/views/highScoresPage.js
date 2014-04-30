SnakeGame.Views.highScoresPage = SnakeGame.Views.base.extend({
  info: 'view:highScoresPage',

  className: 'page',

  events: {
    'click .reset': 'playAgain',
    'click .save-score' : 'disableForm',
    'submit' : 'disableForm'
  },

  template: JST['high_scores_page'],

  initialize: function () {
    this.viewState = new Backbone.Model({
      playAgainButtonShown: false,
      addScoreFormShown: true
    })
    this.listenTo(this.viewState, 'change', this.updateView)
  },

  updateView: function () {
    var addScore = this.viewState.get('addScoreFormShown')
    var playAgain = this.viewState.get('playAgainButtonShown');

    if (addScore)
      this.showAddScoreForm();
    else {
      this.hideAddScoreForm();
    }

    if (playAgain) {
      this.showPlayAgainButton();
    } else {
      this.hidePlayAgainButton();
    }
  },

  showPlayAgainButton: function () {
    this.$('.reset').fadeIn();
  },

  hidePlayAgainButton: function () {
    this.$('.reset').hide();
  },

  showAddScoreForm: function () {
    this.addScore = new SnakeGame.Views.addScoreView(
      { model: SnakeGame.gameState }
    );
   this.$('.add-score').html(this.addScore.render().$el);
  },

  hideAddScoreForm: function () {
    this.addScore.remove();
  },

  disableForm: function (e) {
    this.viewState.set({playAgainButtonShown: true, addScoreFormShown: false});
    e.currentTarget.blur();
  },

  render: function () {
    var score = (SnakeGame.gameState && SnakeGame.gameState.get('score')) || 0;
    var renderedContent = this.template({score: score});
    this.$el.html(renderedContent);

    this.viewState.set({'showAddScoreForm': true});

    var scoreboard = new SnakeGame.Views.highScoreBoard(
      { collection: SnakeGame.scores }
    );

    this.$('.scoreboard').html(scoreboard.render().$el);
    return this;
  },

  playAgain: function () {
    SnakeGame.router.navigate("#play", {trigger: true});
  }
})