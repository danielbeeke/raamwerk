define(['context'], function (context) {
  'use strict'

  // A context condition plugin gets a list of contexts that apply for the plugin.
  // The only convention it has to follow is to pass the contexts onto context.react when needed.

  var route_context_condition = {
    contexts: {},
    init: function (contexts) {
      route_context_condition.contexts = contexts

      var path = route_context_condition.cleanPath(location.pathname)

      $(window).on('popstate', function(e) {
        route_context_condition.execute(path)
      })

      // Initial path.
      route_context_condition.execute(path)
    },

    // Execute
    execute: function (path) {
      var contextsToTrigger = {}

      $.each(route_context_condition.contexts, function (contextName, contextDefinition) {
        $.each(contextDefinition.conditions.route, function (delta, conditionPath) {
          if (route_context_condition.compare(path, conditionPath) == true) {
            contextsToTrigger[contextName] = contextDefinition
          }
        })
      })

      // Pass the contexts to trigger to the context module.
      context.react(contextsToTrigger)
    },

    cleanPath: function (path) {
      // Clean the window.location.pathname
      if (path.charAt(0) == '/') path = path.substr(1)
      return path
    },

    // TODO, use fine regexes so we can use dynamic paths.
    compare: function (path, conditionPath) {
      if (path == conditionPath) {
        return true
      }
    }
  }

  return route_context_condition
})
