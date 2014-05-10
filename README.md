# <a href="http://www.serpento.io">Serpent.io</a>, a.k.a. Snake [![Code Climate](https://codeclimate.com/github/jhamon/snake.js.png)](https://codeclimate.com/github/jhamon/snake.js)

## Tech Inventory

- Backbone.js to manage game and scoreboard as a single page app
- Ruby on Rails backend to deliver the SPA and provide a JSON api to persist high scores.
- jQuery for keyboard interactions.

<img src="http://www.github.com/jhamon/snake.js/raw/master/serpent_screenshot.png">

When I first wrote this game I was still learning the "javascript way" of doing object-oriented programming with prototypical inheritance.  I more or less succeeded in that aspect, but the code responsible for rendering the view and managing user interactions was a huge ball of mud.  At that time I knew just enough jQuery to be dangerous, and while the basic mechanics seemed to work I had all my truth in the DOM and ran into a wall while trying to extend it to have more features.  I wasn't unbinding events properly, so chaos ensued when I tried to reset the game for another play without a hard refresh.  It was a mess, but I had other things I wanted to work on.

## Backbone reboot
I recently revisted the project for a couple of days to apply what I'd learned in the intervening months about keeping a clean seperation between the DOM and my data with the help of a client-side framework called `Backbone.js`.  I did an almost complete rewrite, and instead of iterating over all the cells for every frame the game is now primarily driven by cascading events.  The cell is the fundamental model of the game, which may belong to any of several different collections (snakeSegments, apples, obstacles) depending on the current state of that cell; these collections publish appropriate events when cells are added or removed, which trigger changes elsewhere in the game.  For example, when an apple is eaten the game view hears the "appleEaten" event and knows to update the score and make a new apple.

<img src="http://www.github.com/jhamon/snake.js/raw/master/serpent_scoreboard_screenshot.png">

Each square is a div element to a backbone cell view.  The view listens to change events on the cell model and updates the div's css class when the underlying data model changes.  The game state is now maintained completely seperate from the DOM's appearance thanks to views that listen to data models.

## Rails backend

This was primarily a javascript project, but as a finishing touch I whipped up a simple Ruby on Rails backend to allow users to save scores to a scoreboard.  A <span class="code">HighScore</span> model is created when the Backbone app <span class="code">POST</span>s one to the <span class="code">/high_scores</span> url. I originally fetched the scores with a <span class="code">GET</span> request to <span class="code">/high_scores</span>, but eventually moved to bootstrapping the high score data with the page delivering the Backbone app to avoid an unnecessary XHR request.
