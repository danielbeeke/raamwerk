define([], function () {
  'use strict'

  var contexts = {
    'about': {
      conditions: {
        // The structure is defined by the plugin.
        // The route(_context_condition) asks an array of paths.
        route: ['demo']
      },
      reactions: {
        // The structure is defined by the plugin.
        // The layer(_context_reaction) asks an array of object from which layers can be made.
        layer: [{
          name: 'info',
          layout: 'two-column',
          data: function () {

          },
          postRender: function () {

          }
        }]
      }
    }
  }

  return contexts
})
