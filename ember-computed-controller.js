/**
 * ember-computed-controller v0.1.0
 * (c) 2014 Jay Phelps
 * MIT Licensed
 * https://github.com/jayphelps/ember-computed-controller
 * @license
 */
(function (Ember) {
  var get = Ember.get,
      set = Ember.set,
      merge = Ember.merge,
      computed = Ember.computed,
      Container = Ember.Container;

  computed.controller = function (controllerName, contentPath, options) {
    var fullName = 'controller:' + controllerName;

    options = merge({ singleton: false }, options);

    return computed('container', contentPath, function () {
      var container = get(this, 'container');
      Ember.assert('Ember.computed.controller requires target to have an Ember.Container at this.container but none was found. You\'re probably manually creating objects? Learn about containers: https://github.com/emberjs/website/pull/1293', container instanceof Container);
      
      var controller = container.lookup(fullName, options);
      
      set(controller, 'content', get(this, contentPath));
      set(controller, 'parentController', this);
      set(controller, 'target', this);

      return controller;
    }).readOnly();
  };

})(Ember);
