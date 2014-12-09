define([], function () {
  'use strict'

  var layer_context_reaction = {
    execute: function (contexts) {
      $.each(contexts, function (contextName, contextDefinition) {
        require(contextDefinition.reactions.dependencies)
      })
    }
  }

  return layer_context_reaction
})
