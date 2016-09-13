import request from 'superagent';
import Promise from 'bluebird';

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

export function postRequest(url, data, headers = {}) {
  return new Promise((resolve, reject) => {
    request.post(url).send(data)
    .set(headers)
    .end((err, res) => {
      if (err) {
        reject(err);
      }

      resolve(res.body);
    });
  });
}

export function postRequestWithAttachments(url, data, attachments, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = request.post(url).set(headers);

    Object.keys(data).forEach((key) => {
      req.field(key, data[key]);
    });

    attachments.forEach((attachment) => {
      req.attach(attachment.fieldName, attachment.file);
    });

    req.end((err, res) => {
      if (err) {
        reject(err);
      }

      resolve(res.body);
    });
  });
}

export function putRequest(url, data, headers = {}) {
  return new Promise((resolve, reject) => {
    request.put(url).send(data)
    .set(headers)
    .end((err, res) => {
      if (err) {
        reject(err);
      }

      resolve(res.body);
    });
  });
}

export function deleteRequest(url, successAction, errorAction, headers = {}) {
  return dispatch => {
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
