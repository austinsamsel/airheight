---
title: Building Capote Meteor & Mocha TDD (Part 3)
date: 2015-10-26 23:58 UTC
tags: meteor, mocha, tdd
layout: layout_article
---

# Building Capote: Meteor & Mocha TDD (Part 3)

Welcome to Part 3 !!!

In last week's post we wrote the tests and code for showing our posts in order and we created timestamps for our posts. You can grab the code from the last chapter [here](https://github.com/austinsamsel/capote/tree/part-2). If you want to review the last post, you can [visit it here](http://hightopsnyc.com/blog/building-capote-part-2.html).

In this part we are going to add the ability to create posts, delete them. I'm going to sprint through the Meteor creating and deleting posts, but give a little more explanation for the tests that go into this.

Here's our test for creating posts. We're inputting text into our form fields named title and content, then calling jQuery's click handler, *.click();*

Finally we check that the first title is matching our assertion. This type of test is in the BDD style, in the sense that I'm thinking about the user finding the form fields on the page, filling in the values and then pressing submit.


<pre><code class="language-javascript">// tests/mocha/client/client.js
…
describe("Creating Posts", function(){
  it("creates a post when I fill in the fields", function(){
    Meteor.flush();
    $('[name="title"]').val('a new post');
    $('[name="content"]').val('a new sample post');
    $('[type="submit"]').click();
    chai.assert.equal($(".title:eq(0)").html(), "a new post");
  });
});
…</code></pre>

This test will fail until we add in our code to the client. Let's go ahead and update our templates with the form.

    //client/index.html
    …
    {{> createPost}} <!-- new stuff here: this calls in the new createPost template -->
    <div class="container">
      {{#each posts}}
        {{> post}}
      {{/each}}
    </div>
    …
    <template name="createPost">
      <div class="create-post">
        <form>
          Create a post:
          <input type="text" placeholder="add a title" name="title">
          <textarea placeholder="write your words here" name="content"></textarea>
          <input type="submit" value="Submit" />
       </form>
     </div>
    </template>

Our test will still fail until we allow entries to be inserted to the database.

<pre><code class="language-javascript">//client/posts.js
…
Template.createPost.events({
  'submit form': function(e){
    e.preventDefault();
    var title = $('[name="title"]').val();
    var content = $('[name="content"]').val();

    Posts.insert({
      title: title,
      content: content,
      createdAt: new Date()
    });
    $('[name=title]').val('');
    $('[name=content]').val('');
  }
});
…</code></pre>

You'll notice all the tests have gone to green... but only the first time you run them!

If you check out the Mocha iframe in the Velocity panel, you'll see a mirror version of the app. Every time the tests run it will add in a new post and break our previous tests. That's probably a sign these are some brittle tests. Either we can make them a little more general or automatically flush the database every time we run the tests or we can make use of a before or after block to clean up what we've changed. For now, I'm going to do the latter.

If we successfully add a new post, then let's delete it after it's been created. You could find the post using jQuery... or just use a method to find and remove the post by its ID. I'm doing the latter here. I think its a nicer way to do the clean up than waiting for the delete feature to be working. And what would happen if we build in the delete feature, but it breaks? We'd have many failing tests instead of just one.

We'll add this test in the beginning of the "describe" block of "Creating Posts".
<span style="color:#fff">```</span>
<pre><code class="language-javascript">// tests/mocha/client/client.js
…
after(function(done){
  var latestPost = Posts.findOne({}, {sort: {createdAt: -1}});
  var latestId = latestPost._id
  Meteor.autorun(function(){
    if (latestId){
      Posts.remove(latestId);
      done();
    }
  });
});
…</code></pre>

Stop the server and run *meteor reset && meteor* in the command line to manually reset the database and mirror database. All tests should be passing.

We'll follow a similar pattern for deleting posts. First, we'll write our tests. I'm imagining we'll have either a text link or a button next to each post. Either way it can have a css class called *.deletePost* which we'll reference from our javascript.

<pre><code class="language-javascript">//tests/mocha/client/client.js
…
describe("deleting posts", function(){
  it("deletes when I tell it to delete", function(){
    Meteor.flush();
    $(".deletePost").first().click();
    chai.assert.equal($(".title:eq(0)").html(), "Neutra messenger bag");
  });
});
…</code></pre>

We'll add in the code for deleting posts now.

      //client.index.html
      …
      <div class="content">{{content}}</div>
      <!-- we'll add in the delete link right below the content helper -->
      • <a href="#" class="deletePost">delete</a>
      …

A new helper for the content template will allow us delete a post in the database.


<pre><code class="language-javascript">// client/posts.js
…
Template.post.events({
  'click .deletePost': function(e){
    e.preventDefault();
    var thisPostId = this._id;
    Posts.remove(thisPostId);
  }
});
…</code></pre>

Again we'll have some wonky action in our tests. Let's create a post before we delete it, so that all our tests begin with a fresh state. We'll add this code first thing in the describe block for "deleting posts".

<pre><code class="language-javascript">// tests/mocha/client/client.js
…
before(function(done){
  Posts.insert({
    title: "delete me",
    content: "please delete me",
    createdAt: new Date()
  });
  done();
});
</code></pre>

You'll probably need to run *metor reset && meteor* again from the command line to clear out the databases. Once you do that all tests should be green.

If you want to check out the code from this section, you can grab it from [GitHub](https://github.com/austinsamsel/capote/tree/part-3)

[Continue to Part 4](http://hightopsnyc.com/blog/building-capote-part-4.html)
