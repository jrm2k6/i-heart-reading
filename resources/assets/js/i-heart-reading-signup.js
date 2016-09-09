import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import SignupComponent from './components/signup/SignupComponent';
import RegisterSchoolComponent from './components/signup/RegisterSchoolComponent';

const appReducer = combineReducers(Object.assign({}, {}, {
  routing: routeReducer
}));

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunk)(createStore);

const store = createStoreWithMiddleware(appReducer);

const getRoutes = (store) => {
  return (
    <Route path='signup' component={SignupComponent}>
      <IndexRoute component={RegisterSchoolComponent} />
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
