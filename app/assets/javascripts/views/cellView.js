(function () {
  'use strict';

  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});

  SnakeGame.Views.cellView = Backbone.View.extend({
    className: 'cell',

    tagName: 'div',

    initialize: function () {
      this.listenTo(this.model, 'change:status', this.swapClass);
    },

    render: function () {
      this.$el.addClass(this.model.get('status'));
      return this;
    },

    swapClass: function (model) {
      var oldClass = model.previousAttributes().status;
      this.$el.removeClass(oldClass);
      this.$el.addClass(model.get('status'));
    }
  });
})();