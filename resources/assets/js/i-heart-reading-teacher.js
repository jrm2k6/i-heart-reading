import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import AddBookComponent from './components/AddBookComponent';
import BookComponent from './components/BookComponent';
import BookDashboardComponent from './components/BookDashboardComponent';
import HomeComponent from './components/HomeComponent';
import TeacherResponsesComponent from './components/teacher/responses/TeacherResponsesComponent';
import TeacherResponsesDashboardComponent from
  './components/teacher/responses/TeacherResponsesDashboardComponent';
import reducers from './reducers';
import teacherReviewsReducer from './reducers/teacherReviewsReducer';

import AppComponent from './components/AppComponent';

const _reducers = Object.assign({}, reducers, { teacherReviewsReducer });
const appReducer = combineReducers(Object.assign({}, _reducers, {
  routing: routeReducer
}));

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunk)(createStore);

const store = createStoreWithMiddleware(appReducer);
(function() {
  ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='app' component={AppComponent}>
              <IndexRoute component={HomeComponent} />
              <Route path='books' component={BookComponent}>
                  <IndexRoute component={BookDashboardComponent} />
                  <Route path='add' component={AddBookComponent} />
              </Route>
              <Route path='responses' component={TeacherResponsesComponent}>
                  <IndexRoute component={TeacherResponsesDashboardComponent} />
              </Route>
          </Route>
        </Router>
      </Provider>, document.getElementById('app-container'));
}());
