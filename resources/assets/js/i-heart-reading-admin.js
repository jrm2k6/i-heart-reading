import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { fetchUser } from './actions/userProfileActions';
import adminReducers from './reducers/admin';
import AdminComponent from './components/admin/AdminComponent';
import AdminDashboardComponent from './components/admin/AdminDashboardComponent';

const appReducer = combineReducers(Object.assign({}, adminReducers, {
  routing: routeReducer
}));

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunk)(createStore);

const store = createStoreWithMiddleware(appReducer);

const getRoutes = (store) => {
  const hasLoggedInUser = (nextState, replaceState, callback) => {
    const state = store.getState();
    if (!state.userProfileReducer.user) {
      store.dispatch(fetchUser()).then(
        ({ type, payload }) => {
            callback();
        },
        (err) => { window.location = '/login' }
      );
    }
  };

  return (
    <Route path='admin' component={AdminComponent} onEnter={hasLoggedInUser}>
      <IndexRoute component={AdminDashboardComponent} />
    </Route>
  );
};

(function() {
  ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          { getRoutes(store) }
        </Router>
      </Provider>, document.getElementById('app-container'));
}());
