SnakeGame.Routers.snakeRouter = Backbone.Router.extend({
  routes: {
    "play": "startGame",
    "highscores": "highScores"
  },

  initialize: function (options) {
    this.$rootEl = $(options.rootEl);
  },

  startGame: function () {

    var gameView = new SnakeGame.Views.gameView();
    this._swapView(gameView);
  },

  highScores: function () {
    var highScoresPage = new SnakeGame.Views.highScoresPage();
    this._swapView(gameView);
  },

  _swapView: function (newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
    return this;
  }
})