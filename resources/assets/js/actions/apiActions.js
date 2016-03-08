import request from 'superagent';
export const ASYNC_CALL_STARTED = 'ASYNC_CALL_STARTED';

export function asyncStarted() {
  return {
    type: ASYNC_CALL_STARTED
  };
}

export function getRequest(url, successAction, errorAction, data = {}) {
  return (dispatch, getStore) => {
    dispatch(asyncStarted());
    request.get(url)
      .query(data)
      .end((err, res) => {
        if (err) {
          dispatch(errorAction(err));
        }

        dispatch(successAction(res.body));
      });
  };
}

export function postRequest(url, data, successAction, errorAction, headers = {}) {
  return (dispatch, getStore) => {
    dispatch(asyncStarted());

    request.post(url).send(data)
    .set(headers)
    .end((err, res) => {
      if (err) {
        dispatch(errorAction(err));
      }

      dispatch(successAction(res.body));
    });
  };
}
