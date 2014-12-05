define(['layers', 'renderer'], function (layers, renderer) {
  'use strict'

  // A layer class.
  // @info must atleast contain:
  //
  // {
  //   key: 'layerName' // this is unique, will be merged if created again
  //   layout: 'two-columns'
  // }

  var layer = function (info) {
    var innerClass = {
      key: info.key,
      layout: info.layout,
      element: null,

      // Class methods.
      claimElement: function () {
        if (!$('[layer="' + innerClass.key + '"]').length) {
          $('#app').append('<div layer="' + innerClass.key + '"></div>')
        }

        innerClass.element = $('[layer="' + innerClass.key + '"]')[0]
      },

      render: function () {
        innerClass.claimElement()
        var html = renderer.get(innerClass.layout, innerClass.data())
        $(innerClass.element).html(html)
      }
    }

    // Inherit the given data/functions to the class.
    if (info.data) { innerClass.data = info.data } else { innerClass.data = function () {} }
    if (info.postRender) { innerClass.postRender = info.postRender }
    if (info.zIndex) { innerClass.zIndex = info.zIndex }

    return innerClass
  }

  return layer
})
