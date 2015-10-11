---
title: Building-Capote:-Meteor-&-Mocha-TDD-(Part2)
date: 2015-10-10 22:08 UTC
tags: meteor, mocha, tdd
---

# Building Capote: Meteor & Mocha TDD (Part 2)

In the last post, we set up our app, fixtures, and got our first test to pass. You can grab the code from the last chapter [here](https://github.com/austinsamsel/capote/tree/part-1). If you want to review the last post, you can [visit it here](http://hightopsnyc.com/blog/building-capote.html).

## Testing UI Objects and Sort Order

It's time to actually show our posts in the UI to our users. In the first test, I want to make sure there's at least one post displaying by checking if the css class that's associated with the post gets printed to the page. Then I'll know there's a post on the page, no matter the content of the post. Then I want to test the order of the posts so that the most recent posts show up first in the list.

<pre><code class="language-javascript">// tests/mocha/client/client.js

if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){

    describe("Posts", function(){
      it("shows a post", function(){
        Meteor.flush();
        chai.assert.typeOf($(".title:eq(0)"), 'object');
      })
      it("should show my latest post, first.", function(){
        Meteor.flush();
        chai.assert.equal($(".title:eq(0)").html(), "Neutra messenger bag");
      });
    });

  });
}</code></pre>


After the tests, we'll get to writing the actual code. First we'll create a subscription so our template can find the posts in the database. We don't need to create a publication since we still have the autopublish package installed by default (and we'd be sure to remove it if this app was going into production). We also set up our templates to display the posts.

<pre><code class="language-javascript">// client/posts.js
if (Meteor.isClient) {
  Template.body.helpers({
    posts: function () {
      return Posts.find({}, {sort: {createdAt: -1}});
    }
  });
}</code></pre>

    // client/index.html
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Capote - track your words per day</title>
    </head>

    <body>
      <div class="container">
        {{#each posts}}
          {{> post}}
        {{/each}}
      </div>
    </body>

    <template name="post">
      <div class="title">{{title}}</div>
      <div class="content">{{content}}</div>
    </template>

## Testing Timestamps

Before we can think about measuring the daily word count streak, we need to include a timestamp with each post. The following is a test to check for that.

<pre><code class="language-javascript">// tests/mocha/client/client
...
  it("should show a clean timestamp", function(){
    chai.assert.equal($(".timestamp:eq(1)").html(), "01-03-2015");
  });
...</code></pre>

We'll update our fixtures by adding a date/time for when our posts are created. We'll also include the new field in our templates.

<pre><code class="language-javascript">// server/app.js

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Posts.find().count() === 0) {
      Posts.insert({
        title: "Neutra messenger bag",
        content: "Tousled forage trust fund readymade Neutra messenger bag. Drinking vinegar chia Marfa, vegan messenger bag disrupt Wes Anderson try-hard. Small batch scenester raw denim synth cronut cornhole, iPhone try-hard single-origin.",
        createdAt: new Date(2015,0,4) // new timestamp
      });
      Posts.insert({
        title: "fatback filet mignon",
        content: "Bacon ipsum dolor amet alcatra turkey shank cupim corned beef brisket chuck boudin tri-tip t-bone kevin fatback filet mignon. Short loin tongue short ribs.",
        createdAt: new Date(2015,0,3) // new timestamp
      });
      Posts.insert({
        title: "know what I'm sayin'",
        content: "You see? It's curious. Ted did figure it out - time travel. And when we get back, we gonna tell everyone. How it's possible, how it's done, what the dangers are. But then why fifty years in the future when the spacecraft encounters a black hole does the computer call it an 'unknown entry event'?",
        createdAt: new Date(2015,0,1) // new timestamp
      });
    }
  });
}</code></pre>

    // client/index.html

    <template name="post">
      <!-- our new timestamp below -->
      <div class="timestamp">{{createdAt}}</div>
      <div class="title">{{title}}</div>
      <div class="content">{{content}}</div>
    </template>

To see whether this passes or fails, we'll manually reset our app by running *meteor reset && meteor* in the command line. Mocha's mirror derives itself from the application your developing, so the fixtures won't reset on their own. The idea is that you wouldn't want to reset the mirror database each time before running tests because it would take too long.

Our test still fails because, by default, Meteor prints out the full timestamp, like: *Sat Jan 03 2015 00:00:00 GMT-0500 (EST)*

We'll need to make use of [Moment JS](http://momentjs.com/) to parse our timestamps. Run the following in the command line to add the moment package to our app.

<pre><code class="language-javascript">$ meteor add moments:moment</code></pre>

Then we'll create a helper to parse the timestamp. It takes the default timestamp as an argument. Next we'll update our template with the cleanDate helper, effectively passing in that long default timestamp and returning our clean timestamp.

<pre><code class="language-javascript">// client/helper.js
Template.registerHelper('cleanDate', function(date) {
	return moment(date).format('MM-DD-YYYY');
});
</code></pre>

    // client/index.html
    <div class="timestamp">{{cleanDate createdAt}}</div>

Now our tests all pass.

## Wrapping Up

If you have any questions or you want me to break down the steps even further, please let me know. If you want to check out the code for this section, you can grab it from [GitHub](https://github.com/austinsamsel/capote/tree/part-2). In the next post we'll write tests for creating and deleting posts.

Part 3 coming soon.
