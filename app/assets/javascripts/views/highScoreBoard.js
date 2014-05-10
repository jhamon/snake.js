(function () {
  'use strict';

  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});

  SnakeGame.Views.highScoreBoard = SnakeGame.Views.base.extend({
    template: JST.scoreboard,

    scoreItemTemplate: JST.scoreboard_item,

    initialize: function () {
      this.listenTo(this.collection, 'add', this.addOne);
    },

    render: function () {
      this.$el.html(this.template());

      var scoreDivs = this.collection.map( function (score) {
        var scoreDate = new Date(score.get('created_at')); 
        var scoreAge = this.timeSinceDate(scoreDate);
        return this.scoreItemTemplate({'score': score, 'score_age': scoreAge});
      }, this);

      // Using the batch append here, again, to get that sweet
      // document fragment performance.
      this.$('table').append(scoreDivs);
      return this;
    },

    addOne: function (newScore) {
      var scoreDate = new Date(); 
      var scoreAge = this.timeSinceDate(scoreDate);
      var $renderedScore = $(this.scoreItemTemplate({score: newScore, score_age: scoreAge}));

      $renderedScore.addClass('new');
      $renderedScore.hide();
      this.$('.table tr:first-child').after($renderedScore);
      $renderedScore.slideDown('slow');
      return this;
    }
  });
})();