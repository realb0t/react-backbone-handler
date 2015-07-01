var Post = React.createClass({
  mixins: [ 'ModelHandlerMixin' ],
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
  getInitialState: function() {
    return {
      title: null,
      'post.description': null
    }
  },
  render: function() {
    return <div>
      <input name="title" 
        value={this.state.title} 
        onChange={this.handleChangeEvent.bind(this, 'post', 'title')} />
    </div>;
  }
});