define(['layer'], function (layer) {
  'use strict'

  // The layers factory

  var layers = {
    stack: {},
    addLayer: function (info) {
      if (!layers.stack[info.key]) {
        var currentLayer = layers.stack[info.key] = new layer(info)
        currentLayer.render()
        if (currentLayer.postRender) {
          currentLayer.postRender()
        }
      }
      else {
        var currentLayer = layers.stack[info.key]
      }

      currentLayer.makeActive()
    },
  }

  return layers
})
