(function () {
  'use strict';

  var SnakeGame = window.SnakeGame = (window.SnakeGame || {});

  SnakeGame.Views.base = Backbone.View.extend({
    timeSinceDate: function (date) {
      var today = new Date();
      // Time diff in miliseconds
      var milli = today - date;

      if (milli < 5000) {
        return "just now";
      } else if (milli < 60000) {
        var secs = milli / 1000 | 0;
        return secs + " seconds ago";
      } else if (milli < 3600000) {
        var mins = milli / (60000) | 0; // 1000 * 60 per min
        return (mins === 1) ? mins + " minute ago" : mins + " minutes ago";
      } else if ( milli < 86400000) {
        var hours = milli / (3600000) | 0; // 1000 * 60 * 60 per hour
        return (hours === 1) ? hours + " hour ago" : hours + " hours ago";
      } else {
        var days = milli / (86400000) | 0; // 1000 * 60 * 60 * 24 per day
        return (days === 1) ? days + " day ago" : days + " days ago";
      }
    },

    csrf_token: function () {
      return $("[name^='csrf-token']").attr("content");
    },

    slideAppend: function ($el) {
      $el.hide();
      this.$el.append($el);
      $el.slideDown();
    },

    slidePrepend: function ($el) {
      $el.hide();
      this.$el.prepend($el);
      $el.slideDown();
    }
  });
})();