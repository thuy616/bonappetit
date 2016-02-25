var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire'); // comm. between react and the data retrieved from firebase
var FireBase = require('firebase'); // comm. with the online datastore, make request and get response
var rootUrl = "https://glaring-heat-9503.firebaseio.com/";
var Header = require('./header-item');
var Item = require('./item');

// in real production, the url should be placed in a config file
// which should not be in the public directory

module.exports = React.createClass({
    mixins: [ ReactFire ], // whatever in ReactFire will be copied onto this components

    getInitialState: function() {
        return {
            title: "",
            list: {},
            items: {},
            loaded: false,
            listId: ""
        }
    },

    // whatever is inside this function will be rendered only once
    componentWillMount: function() {
        this.fb = new FireBase(rootUrl + "lists/" + this.props.params.id);
        this.bindAsObject(this.fb, 'list');
        this.fb.on('value', this.handleDataLoaded);
        this.setState({listId: this.props.params.id});
    },
    componentWillReceiveProps: function(nextProps) {
        this.fb = new FireBase(rootUrl + "lists/" + nextProps.params.id);
        this.bindAsObject(this.fb, 'list');
        this.fb.on('value', this.handleDataLoaded);
        this.setState({listId: nextProps.params.id});
    },

    render: function() {

        return <div className="row panel panel-default">
            <div className="col-md-8 col-md-offset-2">

                <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
                    <h2 className="text-center">
                        {this.state.title}
                    </h2>
                    <Header id={this.state.listId}/>
                    <hr/>
                    <ul>
                        {this.renderItems()}
                    </ul>
                    {this.deleteButton()}
                </div>
            </div>
        </div>
    },

    deleteButton: function() {
        if(!this.state.items || this.state.items.length === 0) {
            return
        } else {
            return <div className="text-center clear-complete">
                <hr/>
                <button type="btn btn-default" onClick={this.handleClearCompleteClick}>Clear Complete</button>
            </div>
        }
    },

    handleClearCompleteClick: function(event) {
        for (var key in this.state.items) {
            if (this.state.items[key].done) {
                this.fb.child(key).remove();
            }
        }
    },

    handleDataLoaded: function() {
        console.log("loaded");
        console.log(this.state.list.items);
        this.setState( {
            loaded: true,
            items: this.state.list.items,
            title: this.state.list.text
        })
    },

    renderItems: function() {

        if(!this.state.items) {
            return <h4>
                Add a new item to get started!
            </h4>
        } else {
            console.log(this.state.items);
            var children = [];

            for (var key in this.state.items) {
                var item = this.state.items[key];
                item.key = key;

                children.push(

                    <Item item={item} key={ item.key }/>

                );
            }

            return children;
        }

    }
});

