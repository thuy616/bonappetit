var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var ReactFire = require('reactfire'); // comm. between react and the data retrieved from firebase
var FireBase = require('firebase');
var rootUrl = "https://glaring-heat-9503.firebaseio.com/";

module.exports = React.createClass({
    mixins: [ ReactFire ],

    render: function() {
        return <div>
            {this.renderLists()}
        </div>
    },

    renderLists: function() {
        if(!this.props.lists) {
            return <h4>
                Add a new shopping list to get started!
            </h4>
        } else {
            var children = [];

            for (var key in this.props.lists) {
                var list = this.props.lists[key];
                list.key = key;

                children.push(
                    <div key={list.key}>
                        <div className="input-group">

                            <input type="checkbox" className="list-checkbox" id={list.key}
                                       checked={list.done}
                                       onChange={this.handleDoneChange}/>

                            <Link to={"lists/" + list.key}
                                  key={ list.key } title={list.title} className="list-title">
                                {list.text}
                            </Link>
                        </div>

                    </div>
                );
            }

            return children.map(function(child){
                return child;
            });
        }
    },

    handleDoneChange: function(event) {
        var update = { done: event.target.checked };
        this.fb = new FireBase(rootUrl + 'lists/' + event.target.id);
        this.fb.update( update );
    },
})