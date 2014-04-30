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
    console.log("This game was developed by Jennifer Hamon (jen@hamon.io) with Backbone.js, jQuery, and Ruby on Rails.  Please let me know if you have any problems.")
    Backbone.history.start();
    SnakeGame.router.navigate("#play", {trigger: true});
  }
};

$(document).ready(function(){
  SnakeGame.initialize();
});
