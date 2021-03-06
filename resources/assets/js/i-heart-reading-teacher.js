import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { fetchUser } from './actions/userProfileActions';
import SearchBookComponent from './components/SearchBookComponent';
import BookComponent from './components/BookComponent';
import BookDashboardComponent from './components/BookDashboardComponent';
import TeacherHomeComponent from './components/teacher/TeacherHomeComponent';
import TeacherResponsesComponent from './components/teacher/responses/TeacherResponsesComponent';
import StudentResponseComponent from './components/responses/StudentResponseComponent';
import AcceptedStudentResponseComponent from './components/responses/AcceptedStudentResponseComponent';
import WriteResponseComponent from './components/responses/WriteResponseComponent';
import UrlComponent from './components/responses/UrlComponent';
import UploadImageComponent from './components/responses/UploadImageComponent';
import UpdateCurrentResponse from './components/responses/UpdateCurrentResponse';
import EmailNotConfirmedComponent from './components/EmailNotConfirmedComponent';
import ProfileComponent from './components/profile/ProfileComponent';
import TeacherResponsesDashboardComponent from
  './components/teacher/responses/TeacherResponsesDashboardComponent';
import reducers from './reducers';
import teacherReviewsReducer from './reducers/teacherReviewsReducer';
import loadingReducer from './reducers/loadingReducer';

import AppComponent from './components/AppComponent';

const _reducers = Object.assign({}, reducers, { teacherReviewsReducer, loadingReducer });
const appReducer = combineReducers(Object.assign({}, _reducers, {
  routing: routeReducer
}));

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunk)(createStore);

const store = createStoreWithMiddleware(appReducer);

const getRoutes = (store) => {
  const verifyUserIsConfirmed = (nextState, replaceState, callback) => {
    const state = store.getState();
    if (!state.userProfileReducer.user) {
      store.dispatch(fetchUser()).then(
        ({ type, payload }) => {
          if (!payload.confirmed) {
            window.location = '/confirmation-email';
          } else {
            callback();
          }
        },
        (err) => { console.log(err); }
      );
    }
  };

  return (
    <Route path='app' component={AppComponent} onEnter={verifyUserIsConfirmed}>
      <Route component={EmailNotConfirmedComponent} />
      <IndexRoute component={TeacherHomeComponent} />
      <Route path='student/:id' component={ProfileComponent} />
      <Route path='books' component={BookComponent}>
          <IndexRoute component={BookDashboardComponent} />
          <Route path='add' component={SearchBookComponent} />
      </Route>
      <Route path='responses' component={TeacherResponsesComponent}>
          <IndexRoute component={TeacherResponsesDashboardComponent} />
          <Route path='student-response/:responseId' component={StudentResponseComponent} />
          <Route path='student-response-accepted/:responseId' component={AcceptedStudentResponseComponent} />
          <Route path='write/:assignmentId' component={WriteResponseComponent} />
          <Route path='image/:assignmentId' component={UploadImageComponent} />
          <Route path='video/:assignmentId' component={UrlComponent} />
          <Route path='link/:assignmentId' component={UrlComponent} />
          <Route path='update/:assignmentId' component={UpdateCurrentResponse} />
      </Route>
    </Route>
  );
}

(function() {
  ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          { getRoutes(store) }
        </Router>
      </Provider>, document.getElementById('app-container'));
}());
