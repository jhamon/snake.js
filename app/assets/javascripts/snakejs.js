window.SnakeGame = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    SnakeGame.scores = new SnakeGame.Collections.highScores(bootstrappedScores);
    SnakeGame.router = new SnakeGame.Routers.snakeRouter({
      rootEl: '.container'
    });
    Backbone.history.start();
    SnakeGame.router.navigate("#play");
  }
};

$(document).ready(function(){
  SnakeGame.initialize();
});
