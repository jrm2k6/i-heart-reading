import request from 'superagent';
import Promise from 'bluebird';
export const ASYNC_CALL_STARTED = 'ASYNC_CALL_STARTED';

export function asyncStarted() {
  return {
    type: ASYNC_CALL_STARTED
  };
}

export function getRequest(url, data = {}) {
  return new Promise((resolve, reject) => {
    request.get(url)
      .query(data)
      .end((err, res) => {
        if (err) {
          reject(err);
        }

        resolve(res.body);
      });
  });
}

export function postRequest(url, data, successAction, errorAction, headers = {}) {
  return dispatch => {
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

export function postRequestWithAttachments(url, data, attachments,
  successAction, errorAction, headers = {}) {
  return dispatch => {
    dispatch(asyncStarted());

    const req = request.post(url).set(headers);

    Object.keys(data).forEach((key) => {
      req.field(key, data[key]);
    });

    attachments.forEach((attachment) => {
      req.attach(attachment.fieldName, attachment.file);
    });

    req.end((err, res) => {
      if (err) {
        dispatch(errorAction(err));
      }

      dispatch(successAction(res.body));
    });
  };
}

export function putRequest(url, data, successAction, errorAction, headers = {}) {
  return dispatch => {
    dispatch(asyncStarted());

    request.put(url).send(data)
    .set(headers)
    .end((err, res) => {
      if (err) {
        dispatch(errorAction(err));
      }

      dispatch(successAction(res.body));
    });
  };
}

export function deleteRequest(url, successAction, errorAction, headers = {}) {
  return dispatch => {
    dispatch(asyncStarted());

    request.del(url)
    .set(headers)
    .end((err, res) => {
      if (err) {
        dispatch(errorAction(err));
      }

      dispatch(successAction(res.body));
    });
  };
}
