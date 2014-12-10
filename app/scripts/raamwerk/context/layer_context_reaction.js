define(['raamwerk/layers'], function (layers) {
  'use strict'

  var layer_context_reaction = {
    execute: function (contexts) {
      $.each(contexts, function (contextName, contextDefinition) {
        $.each(contextDefinition.reactions.layer, function (delta, layerInfo) {

          if (layerInfo.dependencies) {
            require(layerInfo.dependencies, function () {
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
