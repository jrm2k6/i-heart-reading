import request from 'superagent';
export const ASYNC_CALL_STARTED = 'ASYNC_CALL_STARTED';
export const POST_REQUEST = 'POST_REQUEST';

function asyncStarted() {
  return {
    type: ASYNC_CALL_STARTED
  };
}
export function postRequest(url, data) {
  return (dispatch, getStore) => {
    dispatch(asyncStarted());

    request.post(url).send(data)
    .end((err, res) => {
      if (err) {
        console.log(err);
      }

      console.log(res);
    });
  }
}
