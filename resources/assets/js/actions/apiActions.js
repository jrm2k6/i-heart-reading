import request from 'superagent';
export const ASYNC_CALL_STARTED = 'ASYNC_CALL_STARTED';
export const POST_REQUEST = 'POST_REQUEST';

function asyncStarted() {
  return {
    type: ASYNC_CALL_STARTED
  };
}
export function getRequest(url, successAction, errorAction) {
    return (dispatch, getStore) => {
      dispatch(asyncStarted());

      request.get(url)
      .end((err, res) => {
        if (err) {
          dispatch(errorAction());
        }
        dispatch(successAction(res.body));
      });
    }
}

export function postRequest(url, data, headers = {}, successAction, errorAction) {
  return (dispatch, getStore) => {
    dispatch(asyncStarted());

    request.post(url).send(data)
    .set(headers)
    .end((err, res) => {
      if (err) {
        dispatch(errorAction(err));
      }
      dispatch(successAction(res.body.book));
    });
  }
}
