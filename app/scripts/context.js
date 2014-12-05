define(['contexts'], function (contexts) {
  'use strict'

  var context = {
    conditionPlugins: {},
    reactionPlugins: {},
    init: function () {
      $.each(contexts, function (contextName, contextDefinition) {
        // Get all the used context plugins by the defined contexts.
        $.each(contextDefinition.conditions, function (conditionPluginName, pluginCondition) {
          if (!context.conditionPlugins[conditionPluginName]) {
            context.conditionPlugins[conditionPluginName] = {}
            context.conditionPlugins[conditionPluginName].contexts = {}
          }

          context.conditionPlugins[conditionPluginName].contexts[contextName] = contextDefinition
        })

        // Get all used reactions by the defined contexts.
        $.each(contextDefinition.reactions, function (reactionPluginName, pluginReaction) {
          if (!context.reactionPlugins[reactionPluginName]) {
            context.reactionPlugins[reactionPluginName] = {}
            context.reactionPlugins[reactionPluginName].contexts = {}
          }

          context.reactionPlugins[reactionPluginName].contexts[contextName] = contextDefinition
        })
      })

      // Init all condition plugins.
      $.each(context.conditionPlugins, function (pluginName, pluginInfo) {
        require([pluginName + '_context_condition'], function (loadedPlugin) {

          if (loadedPlugin.init && typeof(loadedPlugin.init) == 'function') {
            loadedPlugin.init(pluginInfo.contexts)
          }

         context.conditionPlugins[pluginName].plugin = loadedPlugin
        })
      })
    },

    react: function (contexts) {
      console.log(contexts)
    }
  }

  return context
})
