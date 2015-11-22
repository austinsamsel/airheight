---
title: Building Capote Meteor & Mocha TDD (Part 5)
date: 2015-11-17 06:00 UTC
tags: meteor, mocha, tdd
layout: layout_article
---

# Building Capote: Meteor & Mocha TDD (Part 5)

In the last post we built our word count feature. In this part, we're going to create our daily goal feature. We'll be using the daily goal to compare with the word count. Once the user sets the daily goal then we can set a minimum word count for each post and prevent the user from submitting a post that doesn't have enough words.

You can grab the code from the last chapter [here](https://github.com/austinsamsel/capote/tree/part-4). If you want to review the last post, you can [visit it here](http://hightopsnyc.com/blog/building-capote-part-4.html).

Here's the test for our daily goal. I want to make sure I can see the goal in the DOM, and I also want the user to be able to change the goal and we'll see that goal's value in the database.

<pre><code class="language-javascript">// tests/mocha/client/client.js

describe("change daily words goal", function(){
  after(function(done){
    $('[name="goal"]').val('');
    done();
  });
  it("user can change their goal", function(){
    Meteor.flush();
    $('[name="goal"]').val(2);
    chai.assert.equal($('[name="goal"]').val(), 2)
  });
});</code></pre>

Let's create a new template for the daily goal.

	// client/index.html
	…

	{{> createPost}}
	{{> wordcount}}
	{{> dailyGoal}} <!-- include the helper right below the word count -->

	…
	<template name="dailyGoal">
	  <div class="dailyGoal">
	    <form>
	      Your daily goal: <input value="{{dailyGoal}}" placeholder="your goal" name="goal"> words.
	   </form>
	 </div>
	</template>

Our test passes because it just checks the UI. Now we need to create a Goals collection so we can save the goal in our database as well.

I'll add this test to our server tests:

<pre><code class="language-javascript">//tests/mocha/server/server.js

describe("save daily words goal in database", function(){
  before(function(done){
    var goalSaved = Goals.findOne()._id;
    Goals.update({_id: goalSaved}, {$set: {dailyGoal: 1}});
    done();
  });
  it("saves the goal in the database", function(){
    Meteor.flush();
    chai.assert(Goals.findOne().dailyGoal == 1);
  });
});</code></pre>

We'll also need a Goals publication and subscription. We'll take care of feeding our form the daily goal value with a helper. Finally, we'll structure the form to update our goal's value in the database on the keyup event, so that when the user edits their daily goal, it's automatically saved.

<pre><code class="language-javascript">// model/goals.js
Goals = new Mongo.Collection('goals');

if (Meteor.isClient) {
  Meteor.subscribe('goals');

  Template.dailyGoal.helpers({
    dailyGoal: function() {
      var theGoal = Goals.findOne().dailyGoal;
      return theGoal
    }
  });

  Template.dailyGoal.events({
    'keyup [name=goal]': function(e){
      e.preventDefault();

      var mostRecent = Goals.findOne();
      var documentId = mostRecent._id;
      var goal = $('[name="goal"]').val();
      Goals.update(
        { _id: documentId },
        {$set: { dailyGoal: goal }
      });
    },
    'keyup [name=content]': function(e){
      var wordsToCount = $('[name="content"]').val();
      Meteor.call('getWordcount', wordsToCount, function(err, results){
        if(err) console.error(err);
        else    Session.set('wordCountResult', results);
      });
    }
  })
}

// server/app.js

Meteor.publish("posts", function(){
  return Posts.find();
});

Meteor.publish("goals", function(){
  return Goals.find();
});</code></pre>

Finally, for development purposes, let's kick off our Goals collection with one entry since our code only covers updating the daily goal value. We'll add the following to our startup function:

<pre><code class="language-javascript">// server/app.js

if (Goals.find().count() === 0) {
  Goals.insert({
    dailyGoal: 1,
    createdAt: new Date(),
  });
};</code></pre>

Once we reset the database we'll be able to work with our daily goal. Our test should now be passing.

Finally we can begin to enforce a minimum word count that matches the daily goal. I'm not creating a new tests because this code is going to cause some older tests to break since they don't factor in a minimum word count before submitting their posts. I'll update the tests once they start breaking.

In order to disallow the user to post, while still providing some feedback, we can wrap the submit input in an if statement. If there's enough words, then display the submit button... if not, then post the message, "Keep writing!"

	// client/index.html
	<form>
	  Create a post:
	  <input type="text" placeholder="add a title" name="title">
	  <textarea placeholder="write your words here" name="content"></textarea>
	  {{#if enoughWords}}
	    <input type="submit" value="Submit" />
	  {{else}}
	    Keep writing!
	  {{/if}}
	</form>

In order to execute this logic, we'll add a new helper method, enoughWords:

<pre><code class="language-javascript">// model/posts.js

Template.createPost.helpers({
  enoughWords: function(){
    var wordcount = Session.get('wordcount');
    var theGoal = Goals.findOne().dailyGoal;
    return wordcount >= theGoal
  }
});</code></pre>

If you were to test this out in the UI, you'll see that everything is working. Unfortunately this one modification wreaks havoc on our tests. The main culprits are the "creating posts" and "deleting posts" blocks. So we'll need to rewrite them in order to handle the new word count limitations on posting.

I updated the tests with setTimeout functions. I experienced a lot of issues with this part in particular. The way to go when there's so much action and dynamism in the UI is to wrap everything in setTimeout functions to give each block of code time to run and for the UI to update itself.

<pre><code class="language-javascript">// tests/mocha/client/client.js

describe("Creating Posts", function(){
  before(function(done){
    $('[name="goal"]').val(1);
    $('[name="goal"]').keyup();
    $('[name="title"]').val('a new post');
    $('[name="content"]').val('a new sample post');
    $('[name="content"]').keyup();
    setTimeout(function(){
      $('[type="submit"]').click();
    }, 500)
    done();
  });
  after(function(done){
    setTimeout(function(){
      $('.title:contains("a new post")')
        .siblings('.deletePost').first().click();
    }, 500);
    done();
  });
  it("creates a post when I fill in the fields", function(){
    Meteor.flush();
    setTimeout(function(){
      chai.assert.equal($(".title:eq(0)").html(), "a new post");
    }, 500);
  });
});

describe("deleting posts", function(){
  before(function(done){
    Posts.insert({
      title: "delete me",
      content: "please delete me",
      createdAt: new Date()
    });
    done();
  });
  after(function(done){
    setTimeout(function(){
      $('.title:contains("delete me")')
        .siblings('.deletePost')
        .first()
        .click();
    }, 500);
    done();
  });
  it("deletes when I tell it to delete", function(){
    Meteor.flush();
    $('.title:contains("delete me")')
      .siblings('.deletePost')
      .first()
      .click();
    setTimeout(function(){
        chai.assert.equal($(".title:eq(0)").html(), "Neutra messenger bag");
    }, 500);
  });
});</code></pre>

Now that we have these tests passing, we've completed a prototype version of Capote. It doesn't have users, and it still has the autopublish and insecure packages. At least now that we have tests written we can continue development without having to worry so much about whether we're breaking functionality with each update.

If you want to check out the code from this section, you can grab it from [GitHub](https://github.com/austinsamsel/capote/tree/part-5)
