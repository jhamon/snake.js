SnakeGame.Models.highScore = Backbone.Model.extend({
  info: 'model:highScore',

  urlRoot: '/high_scores',

  parse: function (data) {
    this.set({"created_at": new Date(data.created_at)});
    delete data.created_at;
    return data;
  },

  defaults: {
    username: "Anonymous",
    score: 0
  }
})