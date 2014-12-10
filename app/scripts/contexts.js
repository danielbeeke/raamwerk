define([], function () {
  'use strict'

  var contexts = {

    'home': {
      conditions: {
        route: ['*'],
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
        dependencies: ['journey', 'fixtures', 'timeline'],
        layer: [{
          key: 'journey',
          layout: 'journey',
          data: function () {
            var returnData = require('fixtures')
            returnData.timeline = require('timeline')

            return returnData
          },
          postRender: function () {
            var journey = require('journey')
            journey.init()
          }
        }]
      }
    },

    'devel': {
      conditions: {
        route: ['*'],
      },
      reactions: {
        dependencies: ['raamwerk/devel']
      }
    },


  }

  return contexts
})
