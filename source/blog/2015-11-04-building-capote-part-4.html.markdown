---
title: Building Capote Meteor & Mocha TDD (Part 4)
date: 2015-11-04 22:00 UTC
tags: meteor, mocha, tdd
layout: layout_article
---

# Building Capote: Meteor & Mocha TDD (Part 4)

Last week we set up the functionality for users to create posts and delete them. In this part, we're going to build our word count feature.

You can grab the code from the last chapter [here](https://github.com/austinsamsel/capote/tree/part-3). If you want to review the last post, you can [visit it here](http://hightopsnyc.com/blog/building-capote-part-3.html).

Let's make sure there's a word count associated with each post, and that it shows up in the UI. I'll write a quick test based on some of the first ones we wrote. It tests to make sure the first post has a word count of 33 words. I know it will have 33 words because I literally just counted the words in that post.

You can add this test in the "Posts" section, our first set of tests.

<pre><code class="language-javascript">// tests/mocha/client/client.js

...
it("should show a wordcount", function(){
  chai.assert.equal($('.wordcount:eq(0)').html(), "33");
});
...</code></pre>

First, let's update our fixtures and give each post a word count.

<pre><code class="language-javascript">// tests/mocha/client/client.js

...
Posts.insert({
  title: "Neutra messenger bag",
  content: "Tousled forage trust fund readymade Neutra messenger bag. Drinking vinegar chia Marfa, vegan messenger bag disrupt Wes Anderson try-hard. Small batch scenester raw denim synth cronut cornhole, iPhone try-hard single-origin.",
  createdAt: new Date(2015,0,4),
  wordCount: 33
});
Posts.insert({
  title: "fatback filet mignon",
  content: "Bacon ipsum dolor amet alcatra turkey shank cupim corned beef brisket chuck boudin tri-tip t-bone kevin fatback filet mignon. Short loin tongue short ribs.",
  createdAt: new Date(2015,0,3),
  wordCount: 26
});
Posts.insert({
  title: "know what I'm sayin'",
  content: "You see? It's curious. Ted did figure it out - time travel. And when we get back, we gonna tell everyone. How it's possible, how it's done, what the dangers are. But then why fifty years in the future when the spacecraft encounters a black hole does the computer call it an 'unknown entry event'?",
  createdAt: new Date(2015,0,1),
  wordCount: 54
});
...</code></pre>

Cool.

Reset the server *meteor reset && meteor*

Let's make the word count visible in the app. You can add this line in the "post" template at the end.

	// client/index.html

	<div class="wordcount">{{wordCount}}</div>

Our test should be passing.

If you create a new post, there's still no way to calculate or record how many words are in the post. It's time to build that feature. We're going to make use of [wordcount](https://www.npmjs.com/package/wordcount), an npm package. It does what you might think it does, it counts the words in a string. In order to use npm packages with Meteor, we'll need to add the meteorhacks:npm package.

In the command line, run:

<pre><code class="language-javascript">$ meteor add meteorhacks:npm</code></pre>

Adding this package will automatically create a packages.json file. This is where we'll list our packages, like this:

<pre><code class="language-javascript">// packages.json
{
  "wordcount": "1.1.1"
}</code></pre>

Its a good idea to restart the meteor server at this point so npm and the new package can be loaded into our meteor app.

Its important to know that when you use meteorhacks:npm, these packages are only available server side. So we'll set up our word count function in our server code as a method, then call it from the client when we need to make use of it.

Before we write the code, let's also add one more package:

<pre><code class="language-javascript">$ meteor add check</code></pre>

The [check](https://atmospherejs.com/meteor/check) package helps with security by ensuring your users can only pass through the right types of data. You used to be able to use the audit-argument-checks package for the same purpose. But it seems that the check package has taken over. You can read some more about it [in the documentation](http://docs.meteor.com/#/full/check)

Here we are creating a new method called 'getWordcount' which accepts one argument, words, which will be coming from the client. We check to make sure it is only accepting a string. We also require the wordcount package. Finally, we return our argument after running it through the wordcount function that counts the words in our string.

<pre><code class="language-javascript">//server/app.js

Meteor.methods({
  'getWordcount': function getWordcount(words) {
    check(words, String);
    var wordcount = Meteor.npmRequire('wordcount');
    return wordcount(words);
  }
});</code></pre>

To see if this is going to work, we call the method in our server file and watch the command line console for an update.

<pre><code class="language-javascript">//server/app.js

Meteor.call('getWordcount', 'hows it going world?', function(err, results){
  if(err){
    console.error(err);
  }
  else{
    console.log('HEY! it worked, it was ' + results + ' words!');
  }
});</code></pre>

The message should be logged in the console and look like: "HEY! it worked, it was 4 words!"

Now we need a way to record how many words the user is actually typing as they type and once we have that number we can easily save it into the database when the user submits their post.

We'll write a test to make sure that if a user enters two words into the 'content' section of the post, then it should be reflected that the word count is 2. This is the first post where we need to set a timeout before running our assertion. Apparently there is some minimal lag in updating the session and reflecting that in the UI, so we'll give it half a second to update. Our test is going to look something like this:

<pre><code class="language-javascript">// tests/mocha/client/client.js

describe("wordcount", function() {
  before(function(done){
    $('[name="content"]').val('a new');
    $('[name="content"]').keyup();
    done();
  });
  it("displays the wordcount when the user types in the form", function(){
    Meteor.flush();
    setTimeout(function(){
      chai.assert.equal($('span.wordcount-num').text(), "2")
    }, 500);
  });
});</code></pre>

Let's create a new template.

	// client/index.html

	<template name="wordcount">
	  <div class="wordcount-msg">
	    word count: <span class="wordcount-num">{{wordcount}}</span>
	  </div>
	</template>

And include it in underneath the createPost helper.

	// client/index.html

	<body>
	  {{> createPost}}
	  {{> wordcount}} <!-- new helper here -->
	  <div class="container">
	    {{#each posts}}
	      {{> post}}
	    {{/each}}
	  </div>
	</body>

We're going to add a helper and an onRendered call. The onRendered call will set the word count to zero. This makes sense because this should only be called on render, before anyone's typed in the form. Then the helper gets the wordcount's session value.

<pre><code class="language-javascript">//model/posts.js

Template.wordcount.onRendered(function(){
  Session.set('wordcount', 0);
});
Template.wordcount.helpers({
  wordcount: function(){
    return Session.get('wordcount');
  }
});</code></pre>

Now we need to set the session value. We will tie this in to the keyup action in the form. I got this idea from [Meteortips](http://meteortips.com/second-meteor-tutorial/managing-todos/). Whenever a user presses a key (and lifts up their finger) we can fire an event in Meteor that will send whatever is in the form to our wordcount package to count the words. In the createPost events block, add in:

<pre><code class="language-javascript">//model/posts.js

'keyup [name=content]': function(e){
  var wordsToCount = $('[name="content"]').val();
  Meteor.call('getWordcount', wordsToCount, function(err, results){
    if(err){
      console.error(err);
    }
    else{
      Session.set('wordcount', results);
    }
  });
}</code></pre>

*Note:* I moved all the content from client/posts.js into model/posts.js -- it didn't make sense to have two posts.js files. The above code gets wrapped by the Meteor.isClient if statement.

This should put our test in the green.

We'll also take care of one more detail. In order to start again with a clean slate after submitting a post and clearing the form, we should also programmatically wipe the word count session. If we don't, the session value will remain at the previous word count until we start typing again. We can update this by adding in our createPost events function:

<pre><code class="language-javascript">//model/posts.js

$('[name=title]').val('');
$('[name=content]').val('');
Session.set('wordcount', 0); // clears the session.</code></pre>

Awesome!!!!

Next up, we're going to add in a daily goals feature and connect it to the word count so we can set a minimum word count for each post.

If you want to check out the code from this section, you can grab it from [GitHub](https://github.com/austinsamsel/capote/tree/part-4)
