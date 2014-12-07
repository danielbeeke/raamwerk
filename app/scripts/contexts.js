define([], function () {
  'use strict'

  var contexts = {
    // Context machine name.
    'demo': {
      conditions: {
        // The structure is defined by the plugin.
        // The route(_context_condition) asks an array of paths, you may use wildcards (*).
        route: ['<front>']
      },
      reactions: {
        // The structure is defined by the plugin.
        // The layer(_context_reaction) asks an array of object from which layers can be made.
        layer: [{
          // The unique key on which layers get merged.
          key: 'demo',

          // The layout template in /templates/
          layout: 'two-column',

          // Data that is send to twig.
          data: function () {
            return {
              label: 'Woop',
              link: 'demo2'
            }
          },

          // A callback to attach your handles to the bare html.
          postRender: function () {}
        }]
      }
    },

    'demo2': {
      conditions: {
        route: ['demo*']
      },
      reactions: {
        layer: [{
          key: 'demo2',
          layout: 'two-column',
          data: function () {
            return {
              label: 'Demo',
              link: ''
            }
          },
          postRender: function () {}
        }]
      }
    }


  }

  return contexts
})
