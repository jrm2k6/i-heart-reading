import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { fetchUser } from './actions/userProfileActions';
import adminReducers from './reducers/admin';
import modalReducer from './reducers/modals';
import AdminComponent from './components/admin/AdminComponent';
import AdminHomeComponent from './components/admin/AdminHomeComponent';

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
      <IndexRoute component={AdminHomeComponent} />
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
