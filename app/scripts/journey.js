define(['jquery', 'dragdealer'], function ($, dragdealer) {
  'use strict'

  var journey = {
    init: function () {

      // Create the drag timeline control.
      new dragdealer('journey-timeline-dragdealer', {
        horizontal: false,
        vertical: true,
        animationCallback: function(x, y) {
          var headerImageHeight = $('.journey-background').height()
          var availableScrollTop = $('.journey-stories').outerHeight() - $(window).height()
          var scrollTopLayer = 600 + availableScrollTop * y
          $('[layer="journey"]').scrollTop(scrollTopLayer)
        }
      })

    }
  }

  return journey
})
