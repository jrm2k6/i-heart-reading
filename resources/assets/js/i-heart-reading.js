import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { fetchUser } from './actions/userProfileActions';
import AddBookComponent from './components/AddBookComponent';
import BookComponent from './components/BookComponent';
import BookDashboardComponent from './components/BookDashboardComponent';
import HomeComponent from './components/HomeComponent';
import ResponsesComponent from './components/responses/ResponsesComponent';
import ResponsesDashboardComponent from './components/responses/ResponsesDashboardComponent';
import WriteResponseComponent from './components/responses/WriteResponseComponent';
import UrlComponent from './components/responses/UrlComponent';
import UploadImageComponent from './components/responses/UploadImageComponent';
import UpdateCurrentResponse from './components/responses/UpdateCurrentResponse';
import reducers from './reducers';

import AppComponent from './components/AppComponent';

const appReducer = combineReducers(Object.assign({}, reducers, {
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
  }

  return (
    <Route path='app' component={AppComponent} onEnter={verifyUserIsConfirmed}>
      <IndexRoute component={HomeComponent} />
      <Route path='books' component={BookComponent}>
        <IndexRoute component={BookDashboardComponent} />
        <Route path='add' component={AddBookComponent} />
      </Route>
      <Route path='responses' component={ResponsesComponent}>
        <IndexRoute component={ResponsesDashboardComponent} />
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
