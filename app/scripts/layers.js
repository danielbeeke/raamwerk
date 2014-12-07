define(['layer'], function (layer) {
  'use strict'

  // The layers factory

  var layers = {
    stack: {},
    addLayer: function (info) {
      if (!layers.stack[info.key]) {
        var currentLayer = layers.stack[info.key] = new layer(info)
        currentLayer.render()
      }

      layers.makeActive(info.key)
    },

    // Could be moved to the class.
    makeActive: function (layerKey) {
      $('[layer].active').removeClass('active')
      $(layers.stack[layerKey].element).addClass('active')
    },
  }

  return layers
})
