define(['twig'], function (twig) {
  'use strict'

  // Makes it possible to render sub templates.
  twig.extendFunction("child", function(template, data) {
    return renderer.get(template, data)
  })

  var renderer = {
    twigTemplates: {},
    // Get's a twig template and renders it to HTML.
    get: function (template, data) {
      if (!renderer.twigTemplates[template]) {
        var loaded = twig.twig({
          id: template,
          href: '/templates/' + template + '.html',
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
