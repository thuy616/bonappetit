var React = require('react');
var ReactRouter = require('react-router');
var HashHistory = require('react-router/lib/HashHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require('./main');
var List = require('./list');

module.exports = (
    <Router history={HashHistory}>
        <Route path="/" component={Main}>
            <Route path="lists/:id" component={List} />
        </Route>
    </Router>
)
