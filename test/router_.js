var Router = Backbone.Router.extend({

  count: 0,

  routes: {
    "noCallback":                 "noCallback",
    "counter":                    "counter",
    "search/:query":              "search",
    "search/:query/p:page":       "search",
    "splat/*args/end":            "splat",
    "*first/complex-:part/*rest": "complex",
    ":entity?*args":              "query",
    "*anything":                  "anything"
  },

  initialize : function(options) {
    this.testing = options.testing;
    this.route('implicit', 'implicit');
  },

  counter: function() {
    this.count++;
  },

  implicit: function() {
    this.count++;
  },

  search : function(query, page) {
    this.query = query;
    this.page = page;
    alert("query: "+query + "page: "+page);
  },

  splat : function(args) {
    this.args = args;
  },

  complex : function(first, part, rest) {
    this.first = first;
    this.part = part;
    this.rest = rest;
  },

  query : function(entity, args) {
    this.entity    = entity;
    this.queryArgs = args;
  },

  anything : function(whatever) {
    this.anything = whatever;
  }

  // do not provide a callback method for the noCallback route

});

Backbone.history = null;
var router = new Router({testing: 101});

Backbone.history.interval = 9;
Backbone.history.start({pushState: false});

var lastRoute = null;
var lastArgs = [];
Backbone.history.bind('route', function(router, route, args) {
  lastRoute = route;
  lastArgs = args;
  alert("route");
});
