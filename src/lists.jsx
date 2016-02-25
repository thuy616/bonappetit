var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire'); // comm. between react and the data retrieved from firebase
var FireBase = require('firebase'); // comm. with the online datastore, make request and get response
var rootUrl = "https://glaring-heat-9503.firebaseio.com/";
var Header = require('./header-list');
var Lists = require('./lists-box');

// in real production, the url should be placed in a config file
// which should not be in the public directory

module.exports = React.createClass({
    mixins: [ ReactFire ], // whatever in ReactFire will be copied onto this components

    getInitialState: function() {
        return {
            lists: {},
            loaded: false
        }
    },

    // whatever is inside this function will be rendered only once
    componentWillMount: function() {
        // create a new instance of firebase and place it in this.firebaseRefs.items
        // /items is nested route, nested resource
        this.fb = new FireBase(rootUrl + 'lists/');

        // bindAsObject is a function defined by reactfire.
        // It retrieves all objects in the url, in this case https://glaring-heat-9503.firebaseio.com/lists
        // and binds to this.state.lists
        this.bindAsObject(this.fb, 'lists');

        // firebase fires events whenever the data has been loaded,
        // we can then fade in the data instead of re-dender show (not good for users to see a blank list and then suddenly a list of data)
        this.fb.on('value', this.handleDataLoaded);
    },

    render: function() {

        return <div className="row panel panel-default">
            <div className="col-md-8 col-md-offset-2">
                <h1>Bon Appetit</h1>
                <h2 className="text-center">
                    My Grocery Lists
                </h2>
                <Header listsStore={this.firebaseRefs.lists}/>
                <hr/>
                <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
                    <Lists lists={this.state.lists} />
                    {this.deleteButton()}
                </div>
            </div>
        </div>
    },

    deleteButton: function() {
        if(!this.state.lists || this.state.lists.length === 0) {
            return
        } else {
            return <div className="text-center clear-complete">
                <hr/>
                <button type="btn btn-default" className="btn btn-warning" onClick={this.handleClearCompleteClick}>Clear Complete</button>
            </div>
        }
    },

    handleClearCompleteClick: function(event) {
        for (var key in this.state.lists) {
            if (this.state.lists[key].done) {
                this.fb.child(key).remove();
            }
        }
    },

    handleDataLoaded: function() {
        this.setState( {
            loaded: true
        })
    }
});

