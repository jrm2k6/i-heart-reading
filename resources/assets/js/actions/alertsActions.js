export const SHOW_ALERT = 'SHOW_ALERT';
export const DISMISS_ALERT = 'DISMISS_ALERT';

const TYPE_SUCCESS = 'success';
const TYPE_WARNING = 'warning';
const TYPE_ERROR = 'error';

function showAlert(typeAlert, content) {
  return {
    type: SHOW_ALERT,
    payload: {
      typeAlert,
      content
    }
  }
}

function dismissAlert() {
  return {
    type: DISMISS_ALERT
  }
}

export function displaySuccessAlert(content, duration = 5) {
  return dispatch => {
    dispatch(showAlert(TYPE_SUCCESS, content));

    window.setTimeout(() => {
      dispatch(dismissAlert());
    }, duration * 1000);
  }
}

export function displayWarningAlert(content, duration = 5) {
  return dispatch => {
    dispatch(showAlert(TYPE_WARNING, content));

    window.setTimeout(() => {
      dispatch(dismissAlert());
    }, duration * 1000);
  }
}

export function displayErrorAlert(content, duration = 5) {
  return dispatch => {
    dispatch(showAlert(TYPE_ERROR, content));

    window.setTimeout(() => {
      dispatch(dismissAlert());
    }, duration * 1000);
  }
}
