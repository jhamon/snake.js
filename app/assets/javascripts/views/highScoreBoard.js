SnakeGame.Views.highScoreBoard = Backbone.View.extend({
  template: JST['templates/scoreboard'],

  scoreTemplate: JST['templates/scoreboard_item'],

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addOne);
  },

  render: function () {
    var renderedContent = this.template()
    this.$el.html(renderedContent);

    this.collection.each( function (score) {
      this.addOne(score);
    });

    return this;
  },

  addOne: function (newScore) {
    var renderedScore = this.scoreTemplate({score: newScore});
    this.$('.table').prepend(renderedScore);
    return this;
  }
})