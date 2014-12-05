define([], function () {
  'use strict'

  var contexts = {
    'demo': {
      conditions: {
        // The structure is defined by the plugin.
        // The route(_context_condition) asks an array of paths.
        route: ['']
      },
      reactions: {
        // The structure is defined by the plugin.
        // The layer(_context_reaction) asks an array of object from which layers can be made.
        layer: [{
          key: 'demo',
          layout: 'two-column',
          data: function () {
            return {
              label: 'Woop',
              link: 'demo2'
            }
          },
          postRender: function () {

          }
        }]
      }
    },

    'demo2': {
      conditions: {
        // The structure is defined by the plugin.
        // The route(_context_condition) asks an array of paths.
        route: ['demo2']
      },
      reactions: {
        // The structure is defined by the plugin.
        // The layer(_context_reaction) asks an array of object from which layers can be made.
        layer: [{
          key: 'demo2',
          layout: 'two-column',
          data: function () {
            return {
              label: 'Demo',
              link: ''
            }
          },
          postRender: function () {

          }
        }]
      }
    }


  }

  return contexts
})
