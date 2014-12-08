define(['twig'], function (twig) {
  'use strict'

  var renderer = {
    twigTemplates: {},
    // Get's a twig template and renders it to HTML.
    get: function (template, data) {
      if (!renderer.twigTemplates[template]) {
        var loaded = twig.twig({
          id: template,
          href: basePath + 'templates/' + template + '.html',
          async: false
        })

        if (loaded) {
          renderer.twigTemplates[template] = true
        }
      }

      if (renderer.twigTemplates[template]) {
        return twig.twig({ ref: template }).render(data)
      }
    },
  }

  return renderer
})
