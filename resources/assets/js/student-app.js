import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import AppComponent from './components/AppComponent';

const reducer = combineReducers(Object.assign({}, {}, {
  routing: routeReducer
}));

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);

(function() {
    ReactDOM.render(
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/app" component={AppComponent}></Route>
          </Router>
        </Provider>, document.getElementById("student-app-container"));
}());
