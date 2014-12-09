define([], function () {
  'use strict'

  var dependencies_context_reaction = {
    execute: function (contexts) {
      $.each(contexts, function (contextName, contextDefinition) {
        require(contextDefinition.reactions.dependencies)
      })
    }
  }

  return dependencies_context_reaction
})
