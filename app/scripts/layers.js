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

      layers.bringToTop(info.key)
    },

    // TODO we need some code here to fix the stack not always adding 1.
    bringToTop: function (layerKey) {
      var max = layers.getMaxZindex()

      $('[layer].active').removeClass('active')
      $(layers.stack[layerKey].element).css('z-index', max + 1).addClass('active')
    },

    getMaxZindex: function () {
      var zIndexes = []

      $.each(layers.stack, function (key, layer) {
        zIndexes.push(parseInt($(layer.element).css('z-index')))
      })

      return Math.max.apply(null, zIndexes)
    },
  }

  return layers
})
