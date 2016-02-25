var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
      return {
          text: ""
      }
    },

    handleClick: function() {
        // send value of text input to firebase
        // create new object in the online datastore
        this.props.listsStore.push({
            text: this.state.text,
            done: false
        });
        this.setState({
            text: ""
        });
    },

    handleInputChange: function(event) {
        this.setState({
            text: event.target.value
        });
    },

    render: function() {
        return <div className="input-group">
            <input
                value={this.state.text}
                onChange={this.handleInputChange}
                type="text"
                className="form-control"/>
                <span className="input-group-btn">
                    <button
                        onClick={this.handleClick}
                        className="btn btn-default" type="button">
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </span>
            </div>

    }
})