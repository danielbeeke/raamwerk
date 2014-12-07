define([], function () {
  'use strict'

  var contexts = {

    'home': {
      conditions: {
        route: ['<front>']
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

    'about': {
      conditions: {
        route: ['about']
      },
      reactions: {
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
          // postRender: function () {}
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
