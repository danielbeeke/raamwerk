define(['layer'], function (layer) {
  'use strict'

  // The layers factory

  var layers = {
    stack: {},
    addLayer: function (info) {
      var currentLayer = layers.stack[info.key] = new layer(info)
      currentLayer.render()
    }
  }

  return layers
})
