define(['underscore', 'fixtures'], function (_, fixtures) {
  'use strict'

    var journey,
    totalPixelLength,
    totalTimeLength,
    firstDate,
    lastDate

    var timeline = {
      init: function () {
        journey = fixtures.journey['mijn-china-reis']
        totalPixelLength = parseInt($(window).height() - 130)

        var counter = 1

        // Prepare context variables.
        $.each(journey.stories, function (delta, story) {
          // Assign first day.
          if (counter == 1) { lastDate = story.epoch }
            // Assign last day.
          if (counter == _.size(journey.stories)) { firstDate = story.epoch }

          counter++
        })

        totalTimeLength = lastDate - firstDate

        // Iterate over the stories, calculate the time position, than the relative position.
        $.each(journey.stories, function (delta, story) {
          story.relativeTimePosition = lastDate - story.epoch
          story.percentagePosition = 100 / totalTimeLength * story.relativeTimePosition
          $('.timeline--item[data-slug="' + story.slug + '"]').css('bottom', story.percentagePosition + '%')
        })

      }
    }

  return timeline
})
