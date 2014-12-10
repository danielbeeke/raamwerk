define(['underscore', 'fixtures', 'dragdealer'], function (_, fixtures, dragdealer) {
  'use strict'

    var timeline = {
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
      },

      prepareTimeline: function (data) {
        var parts = []

        $.each(data.journey.stories, function (delta, story) {
          if (delta > 0) {
            parts.push({
              type: 'timePath',
            })
          }

          parts.push({
            type: 'icon',
            story: story
          })
        })

        return parts
      }
    }

  return timeline
})
