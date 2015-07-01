(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react', 'backbone', 'underscore'], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('react'), require('backbone'), require('underscore'));
  } else {
    root.ReactBackboneHandlerMixin = factory(root.React, root.Backbone, root._);
  }
}(this, function (React, Backbone, _) {
  'use strict';

  ReactBackboneHandlerMixin = {
    getInitializeModelState: function(props) {
      var state = {};
      this.eachHandleModels(props, function(fields, modelName, model) {
        return _(fields).each(function(stateFieldName, modelFieldName) {
          state[stateFieldName] = model.get('modelFieldName');
          return;
        });
      });
      return state;
    },
    /**
     * User method for handling change events
     *
     * Use:
     * <input ... onChange={this.handleChangeEvent.bind(this, 'post', 'title')} />
     *
     * @param {String} modelName Name of model from `handleModels`
     * @param {String} fieldName Name of model field from `handleModels`
     * @param {React.Event} event React event for give change val
     */
    handleChangeEvent: function(modelName, fieldName, event) {
      return this.handleChangeValue(modelName, fieldName, $(e.target).val());
    },
    /**
     * User method for handling change value of model
     *
     * @param {String} modelName Name of model from `handleModels`
     * @param {String} fieldName Name of model field from `handleModels`
     * @param {String|Integer|Object} value New value
     */
    handleChangeValue: function(modelName, fieldName, value) {
      return this.props[modelName].set(fieldName, value);
    },
    /**
     * Assign change models listners.
     * If autobinding is on.
     * @params {Object} - current props object
     */
    bindModelListners: function(props) {
      if (this.autobinding) {
        return this.eachHandleModels(props, function(fields, modelName) {
          return _(fields).each(_(function(stateFieldName, modelFieldName) {
            var changeEvent = 'change:' + modelFieldName,
            handler = this.getChangeValueHandler(stateFieldName);
            return this.listenTo(props[modelName], changeEvent, handler);
          }).bind(this));
        });
      }
    },
    /**
     * Build callback for change state by changed model attribute
     * @params {String}
     */
    getChangeValueHandler: function(stateFieldName) {
      return _(function(model, value, options) {
        var newState = {};
        newState[stateFieldName] = value;
        return this.setState(newState);
      }).bind(this);
    },
    /**
     * Remove change model listner
     * If autobinding is on.
     * @params {Object} - current props object
     */
    unbindModelListners: function(props) {
      if (this.autobinding) {
        return this.eachHandleModels(props, function(fields, modelName) {
          return this.stopListening(props[modelName]);
        });
      }
    },
    /**
     * Each models for handling if this models exist in props
     */
    eachHandleModels: function(props, callback) {
      return _(this.handleModels).each(_(function(fields, modelName) {
        if (_(props[modelName]).isObject()) {
          return callback.apply(this, fields, modelName, props[modelName]);
        } else {
          throw "Model \"" + modelName + "\" is not exist in props";
        }
      }).bind(this));
    },
    componentWillMount: function() {
      _.extend(object, Backbone.Events);
      return this.bindModelListners(this.props);
    },
    componentWillUnmount: function() {
      return this.unbindModelListners(this.props);
    },
    componentWillReceiveProps: function(newProps) {
      this.unbindModelListners(this.props);
      this.bindModelListners(newProps);

      return this.eachHandleModels(newProps, function(fields, modelName) {
        var newState = {};
        _(fields).each(function(stateFieldName, modelFieldName) {
          newState[stateFieldName] = newProps.get(modelFieldName);
          return;
        });
        return this.setState(newState);
      });
    }
  };

  return ReactBackboneHandlerMixin;
}));