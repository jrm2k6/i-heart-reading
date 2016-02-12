import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import AddBookComponent from './components/AddBookComponent';
import BookComponent from './components/BookComponent';
import BookDashboardComponent from './components/BookDashboardComponent';
import bookReducer from './reducers/bookReducers';

import AppComponent from './components/AppComponent';

const reducer = combineReducers(Object.assign({}, bookReducer, {
  routing: routeReducer
}));

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);

(function() {
    ReactDOM.render(
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="app" component={AppComponent}>
                <Route path="books" component={BookComponent}>
                    <IndexRoute component={BookDashboardComponent} />
                    <Route path="add" component={AddBookComponent} />
                </Route>
            </Route>
          </Router>
        </Provider>, document.getElementById("student-app-container"));
}());
