require.config({
  baseUrl: 'scripts',
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    twig: '../bower_components/twig.js/twig',
    history: '../bower_components/history/history',
  }
})

require(['jquery', 'context'], function ($, context) {

  'use strict'

  context.init()

})
