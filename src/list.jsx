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
            list: {},
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
                        {this.state.list.text}
                    </h2>
                    <Header id={this.state.listId}/>
                    <hr/>
                    <ul>
                        {this.renderItems()}
                    </ul>
                    <div className="text-center">
                        <a href="#" className="btn btn-primary" role="button">Back</a>
                    </div>

                </div>
            </div>
        </div>
    },

    handleDataLoaded: function() {

        this.setState( {
            loaded: true
        })
    },

    renderItems: function() {

        if(!this.state.list.items) {
            return <h4>
                Add a new item to get started!
            </h4>
        } else {
            var children = [];

            for (var key in this.state.list.items) {
                var item = this.state.list.items[key];
                item.key = key;
                children.push(

                    <Item item={item} key={ item.key } id={this.state.listId}/>

                );
            }
            return children;
        }

    }
});

