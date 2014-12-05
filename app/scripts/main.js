require.config({
  baseUrl: 'scripts',
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    twig: '../bower_components/twig.js/twig',
  }
})

require(['jquery', 'context'], function ($, context) {

  'use strict'

  context.init()

})
