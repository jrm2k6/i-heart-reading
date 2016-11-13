import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import signupReducers from './reducers/signup';
import SignupComponent from './components/signup/SignupComponent';
import RegisterSchoolComponent from './components/signup/RegisterSchoolComponent';
import PrimaryContactComponent from './components/signup/PrimaryContactComponent';
import GroupCreationComponent from './components/signup/GroupCreationComponent';

const appReducer = combineReducers(Object.assign({}, signupReducers, {
  routing: routeReducer
}));

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunk)(createStore);

const store = createStoreWithMiddleware(appReducer);

const getRoutes = (store) => {
  return (
    <Route path='signup' component={SignupComponent}>
      <IndexRoute component={RegisterSchoolComponent} />
      <Route path='contact' component={PrimaryContactComponent} />
      <Route path='classrooms' component={GroupCreationComponent} />
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
