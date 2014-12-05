define(['context', 'history'], function (context, history) {
  'use strict'

  // A context condition plugin gets a list of contexts that apply for the plugin.
  // The only convention it has to follow is to pass the contexts onto context.react when needed,
  // Initiated by the init function.

  var route_context_condition = {
    contexts: {},
    init: function (contexts) {
      route_context_condition.contexts = contexts

      $(window).on('popstate smooth_transition', function(e) {
        var path = route_context_condition.cleanPath(location.pathname)
        route_context_condition.execute(path)
      })

      // Initial path.
      $(window).triggerHandler('smooth_transition')
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
