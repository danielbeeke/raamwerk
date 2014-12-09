define([], function () {
  'use strict'

  // TODO make a match all conditions.
  var contexts = {

    'home': {
      conditions: {
        route: ['*']
      },
      reactions: {
        layer: [{
          key: 'home',
          layout: 'home',
          // data: function () {},
          // postRender: function () {}
        }]
      }
    },

    'journey': {
      conditions: {
        route: ['journey/*']
      },
      reactions: {
        dependencies: ['journey'],
        layer: [{
          key: 'about',
          layout: 'about',
          // data: function () {},
          // postRender: function () {}
        }]
      }
    },

    'docs': {
      conditions: {
        route: ['docs']
      },
      reactions: {
        layer: [{
          key: 'docs',
          layout: 'docs',
          // data: function () {},
          postRender: function () {
            require(['docs'])
          }
        }]
      }
    },

    'getting-started': {
      conditions: {
        route: ['getting-started']
      },
      reactions: {
        layer: [{
          key: 'getting-started',
          layout: 'getting-started',
          // data: function () {},
          // postRender: function () {}
        }]
      }
    }
  }

  return contexts
})
