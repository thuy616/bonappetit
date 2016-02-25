var React = require('react');
var FireBase = require('firebase');
var rootUrl = "https://glaring-heat-9503.firebaseio.com/";

module.exports = React.createClass({
    getInitialState: function() {
        return {
            text: this.props.item.text,
            done: this.props.item.done,
            textChanged: false
        }
    },

    componentWillMount: function() {
        this.fb = new FireBase(rootUrl + "lists/" + this.props.id + "/items/" + this.props.item.key);
    },

    render: function() {
        return <div className="input-group">
            <span className="input-group-addon">
                <input type="checkbox"
                       checked={this.state.done}
                       onChange={this.handleDoneChange}/>
            </span>

            <input type="text" className="form-control" disabled={this.state.done}
                   value={this.state.text}
                   onChange={this.handleTextChange}
            />

            <span className="input-group-btn">
                {this.changesButtons()}
            </span>

        </div>
    },

    changesButtons: function() {
        if (!this.state.textChanged) {
            return null;
        } else {
            return <span>
                <button className="btn btn-default" onClick={this.handleSaveClick}>Save</button>,
                <button className="btn btn-default" onClick={this.handleUndoClick}>Undo</button>
            </span>
        }
    },

    handleDoneChange: function(event) {
        var update = { done: event.target.checked };
        this.setState( update );
        this.fb.update( update );
    },

    // only update in UI, not persist to firebase unless user clicks Save button
    handleTextChange: function(event) {
        this.setState({
            text: event.target.value,
            textChanged: true
        });
    },

    handleSaveClick: function(event) {
        this.fb.update({text: this.state.text});
        this.setState({
            textChanged: false //to shoot the undo and save buttons away
        });
    },

    handleUndoClick: function(event) {
        console.log(this.props.item.text);
        this.setState({
            text: this.props.item.text,
            textChanged: false // to make undo and save button disappear
        });
    }


})