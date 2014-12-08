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
      path = path.replace(window.basePath, '')

      // Clean the window.location.pathname
      if (path.charAt(0) == '/') path = path.substr(1)
      return path
    },

    compare: function (path, conditionPath) {
      return (conditionPath == '<front>' && path == '') ? true : new RegExp(route_context_condition.convertToRegExp(conditionPath), 'ig').test(path)
    },

    // Converts route to a regular expression, e.g.: users/*/mickeymouse -> users\/.*\/mickeymouse
    convertToRegExp: function (conditionPath) {
      // Escapes symbols
      conditionPath = route_context_condition.preg_quote(conditionPath)

      // Rewrites wildcards again, because preg_quote() escapes them:
      // Replace wildcard followed by a slash by a piece of regex that matches wildcards not containing a slash
      conditionPath = conditionPath.replace('\\*/', '[^\/]*/')
      // Replace wildcard not followed by a slash with a regex wildcard
      conditionPath = conditionPath.replace('\\*', '.*')

      // Makes sure the whole hash must match (start to end)
      conditionPath = '^' + conditionPath + '$'
      return conditionPath
    },

    preg_quote: function (str, delimiter) {
      // Borrowed from php.js
      return String(str)
        .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
    },

  }

  return route_context_condition
})
