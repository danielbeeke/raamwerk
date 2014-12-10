define(['contexts'], function (contexts) {
  'use strict'

  var context = {
    plugins: {
      conditions: {},
      reactions: {}
    },

    init: function () {
      context.getPluginsAndContextsFromContexts(contexts, 'conditions')

      // Init all condition plugins.
      $.each(context.plugins['conditions'], function (pluginName, pluginInfo) {
        require(['raamwerk/context/' + pluginName + '_context_condition'], function (loadedPlugin) {
          if (loadedPlugin.init && typeof(loadedPlugin.init) == 'function') {
            loadedPlugin.init(pluginInfo.contexts)
          }
          context.plugins['conditions'][pluginName].plugin = loadedPlugin
        })
      })
    },

    react: function (reactContexts) {
      context.getPluginsAndContextsFromContexts(reactContexts, 'reactions')

      // Init all condition plugins.
      $.each(context.plugins['reactions'], function (pluginName, pluginInfo) {
        require(['raamwerk/context/' + pluginName + '_context_reaction'], function (loadedPlugin) {
          if (loadedPlugin.execute && typeof(loadedPlugin.execute) == 'function') {
            loadedPlugin.execute(pluginInfo.contexts)
          }
          context.plugins['reactions'][pluginName].plugin = loadedPlugin
        })
      })
    },

    getPluginsAndContextsFromContexts: function (selectedContexts, type) {
      context.plugins[type] = {}

      $.each(selectedContexts, function (contextName, contextDefinition) {
        // Get all the used condition plugins by the defined contexts.
        $.each(contextDefinition[type], function (pluginName, pluginInput) {
          if (!context.plugins[type][pluginName]) {
            context.plugins[type][pluginName] = {}
            context.plugins[type][pluginName].contexts = {}
          }

          context.plugins[type][pluginName].contexts[contextName] = contextDefinition
        })
      })
    }
  }

  return context
})
