export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

function showingModal(component, data) {
  return {
    type: SHOW_MODAL,
    payload: {
      component,
      data
    }
  }
}

function hidingModal() {
  return {
    type: HIDE_MODAL
  }
}

export function showModal(component, data = null) {
  return showingModal(component, data);
}

export function hideModal() {
  return hidingModal();
}
