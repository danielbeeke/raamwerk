define(['raamwerk/layers'], function (layers) {
  'use strict'

  var layer_context_reaction = {
    execute: function (contexts) {
      $.each(contexts, function (contextName, contextDefinition) {
        $.each(contextDefinition.reactions.layer, function (delta, layerInfo) {

          // Here we cross the line of our own plugin and the dependencies plugin.
          // We need to ensure the dependencies are loaded before we render.
          if (contextDefinition.reactions.dependencies) {
            require(contextDefinition.reactions.dependencies, function () {
              layers.addLayer(layerInfo)
            })
          }
          else {
            layers.addLayer(layerInfo)
          }

        })
      })
    }
  }

  return layer_context_reaction
})
