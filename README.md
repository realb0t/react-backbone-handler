# react-backbone-handler

React Mixin for observe Backbone model. This model is given as property of component.

Use Example:

```js
var Post = React.createClass({
  mixins: [ ReactBackboneHandlerMixin ],
  propTypes: {
    post: React.PropTypes.instanceOf(Post).isRequired
  },
  getInitialState: function() {
    return _(this.getInitializeModelState(this.props)).extend({
      other: null
    });
  },
  handleModels: {
    post: {
      // modelFieldName : stateFieldName
      title: 'title',
      desc: 'post_description'
    }
  },
  autobinding: true,
  render: function() {
    return (
      <div>
        <input name="title" 
          value={this.state.title} 
          onChange={this.handleChangeEvent.bind(this, 'post', 'title')} />
      </div>
    );
  }
});
```