define([], function () {
  'use strict'

  // TODO make a match all conditions.
  var contexts = {

    'home': {
      matchAllConditions: true,
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
        layer: [{
          key: 'journey',
          layout: 'journey',
          dependencies: ['journey', 'fixtures', 'timeline'],
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
