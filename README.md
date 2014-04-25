ember-computed-controller
========================

A computed property for injecting an unique instance of a controller into an Ember class instance. Useful for nested `ArrayControllers` and cleaning up your templates.

## Usage

*ComputedProperty* **Ember.computed.controller** (*String* controllerName, *String* contentPath)

#### ES5 (traditional)

```javascript
App.IndexController = Ember.ObjectController.extend({
  posts: Ember.computed.controller('posts', 'blog.posts')
});

App.PostsController = Ember.ArrayController.extend({
  itemController: 'post'
});
  
App.PostController = Ember.ObjectController.extend({
  comments: Ember.computed.controller('comments', 'content.comments')
});
  
App.CommentsController = Ember.ArrayController.extend({
  itemController: 'comment',
  anySelected: function() {
    return this.anyBy('isSelected');
  }.property('@each.isSelected')
});
  
App.CommentController = Ember.ObjectController.extend({
  isSelected: false
});
```

```handlebars
<script type="text/x-handlebars" id="index">
<p>{{posts}}
{{#each posts}}
  <div {{bind-attr class="comments.anySelected:highlighted"}}>
  <p class="a">{{this}}</p>
  <p class="b">{{comments}}</p>
  {{#each comments}}
    <p class="c">{{input type="checkbox" checked=isSelected}} {{this}}</p>
  {{/each}}
  </div>
{{/each}}
</script>
```
**By default, a unique instance will be created**. You can provide an options hash to change this behavior:

```javascript
App.PostController = Ember.ObjectController.extend({
  comments: Ember.computed.controller('comments', 'content.comments', { singleton: true })
});
```

## Any gotchas?

Only for users who stray outside the Ember-idiomatic beaten path and manually create class instances.

Instances must have an `Ember.Container` assigned at `this.container`. Ember will handle this for you when resolving routes, controllers, views, etc but if you manually `.create()` a class, it does not come with a container, so it won't be able to resolve your dependency. You can either pass an existing container along or use the container itself to create your class instances. [Learn more](https://github.com/emberjs/website/pull/1293)

## Credit
[@mmum](https://github.com/mmun) came up with this technique in a [rejected Pull Request](https://github.com/emberjs/ember.js/pull/3424) but gave me permission to steal it.
## License
MIT Licensed
