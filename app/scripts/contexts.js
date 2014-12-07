define([], function () {
  'use strict'

  var contexts = {
    // Context machine name.
    'tuner': {
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
          key: 'tuner',

          // The layout template in /templates/
          layout: 'tuner',

          // Data that is send to twig.
          data: function () {},

          // A callback to attach your handles to the bare html.
          postRender: function () {
            require(['tuner'], function (tuner) {
              tuner.init()
            })
          }
        }]
      }
    },

    'about': {
      conditions: {
        route: ['about']
      },
      reactions: {
        layer: [{
          key: 'about',
          layout: 'about',
          data: function () {},
          postRender: function () {}
        }]
      }
    }


  }

  return contexts
})
