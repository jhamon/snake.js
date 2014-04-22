SnakeGame.Views.scoreView = Backbone.View.extend({
  
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  template: JST['score_view'],

  render: function () {
    var rendered = this.template({ score: this.model });
    this.$el.html(rendered);
    return this;
  }
})