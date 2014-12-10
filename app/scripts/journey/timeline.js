define(['underscore', 'fixtures', 'dragdealer'], function (_, fixtures, dragdealer) {
  'use strict'

    var timeline = {
      init: function () {
        var inited = false

        timeline.setTravelPartHeights()

        // Create the drag timeline control.
        new dragdealer('journey-timeline-dragdealer', {
          horizontal: false,
          vertical: true,
           css3: false,
          animationCallback: function(x, y) {
            if (inited) {
              var headerImageHeight = $('.journey-background').height()
              var availableScrollTop = $('.journey-stories').outerHeight() - $(window).height()
              var scrollTopLayer = 600 + availableScrollTop * y
              $('[layer="journey"]').scrollTop(scrollTopLayer)
            }
            else {
              inited = true
            }
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
      },

      setTravelPartHeights: function () {

        var fixtures = require('fixtures')

        var journey = fixtures.journey,
        totalPixelLength = $('.journey-timeline').height(),
        totalTimeLength,
        firstDate,
        lastDate,
        storiesCount,
        iconHeight = 40,
        timePathHeight,
        counter = 1

        // Prepare context variables.
        $.each(journey.stories, function (delta, story) {
          // Assign first day.
          if (counter == 1) { lastDate = story.epoch }
            // Assign last day.
          if (counter == _.size(journey.stories)) { firstDate = story.epoch }

          counter++
        })

        totalTimeLength = lastDate - firstDate
        storiesCount = journey.stories.length
        timePathHeight = totalPixelLength - ((storiesCount - 1) * iconHeight)
        var timePathOnePercentage = timePathHeight / 100
        var previousPart = null

        // Iterate over the stories, calculate the time position, than the relative position.
        $.each(journey.stories, function (delta, story) {
          story.relativeTimePosition = lastDate - story.epoch
          story.percentagePosition = 100 / totalTimeLength * story.relativeTimePosition

          if (delta > 0) {
            var percentageLength = story.percentagePosition - previousPart.percentagePosition
            var timelineHeight = percentageLength * timePathOnePercentage

            $('.timeline--entree[href="' + story.slug + '"]').prev().height(timelineHeight + 'px')
          }

          previousPart = story
        })
      }
    }

  return timeline
})
