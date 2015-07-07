var Post = React.createClass({
  mixins: [ ReactBackboneHandlerMixin ],
  propTypes: {
    post: React.PropTypes.instanceOf(Post).isRequired
  },
  getInitialState: function() {
    return _(this.getInitializeModelState(this.props)).extend({
      label: null
    });
  },
  handleModels: {
    post: {
      // modelFieldName : stateFieldName
      title: 'title',
      desc: 'post_description'
    }
  },
  stopAutobinding: null,
  handleChangeDescription: function(e) {
    var desc = $(e.target).val();
    this.setState({ label: desc });
    return this.props.post.set({ desc: desc });
  },
  render: function() {
    return (
      <div>
        <input name="title" 
          value={this.state.title} 
          onChange={this.handleChangeEvent.bind(this, 'post', 'title')} />
        <input name="desc" 
          value={this.state.post_description} 
          onChange={this.handleChangeDescription} />
        <label>{this.state.label}</label>
      </div>
    );
  }
});