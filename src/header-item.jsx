var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire'); // comm. between react and the data retrieved from firebase
var FireBase = require('firebase'); // comm. with the online datastore, make request and get response
var rootUrl = "https://glaring-heat-9503.firebaseio.com/";

module.exports = React.createClass({
    mixins: [ ReactFire ],

    getInitialState: function() {
        return {
            text: "",
            loaded: false
        }
    },

    componentWillMount: function() {
        this.fb = new FireBase(rootUrl + "lists/" + this.props.id + "/items");
        this.bindAsObject(this.fb, 'items');
    },

    componentWillReceiveProps: function(nextProps) {
        this.fb = new FireBase(rootUrl + "lists/" + nextProps.id + "/items");
        this.bindAsObject(this.fb, 'items');
    },

    handleClick: function() {
        // send value of text input to firebase
        // create new object in the online datastore
        this.firebaseRefs.items.push({
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