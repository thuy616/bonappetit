var React = require('react');
var Lists = require('./lists');

module.exports = React.createClass({
   render: function() {
       return <div>
           {this.content()}
       </div>
   },

    content: function() {
        if(this.props.children) {
            return this.props.children
        } else {
            return <Lists />
        }
    }

});