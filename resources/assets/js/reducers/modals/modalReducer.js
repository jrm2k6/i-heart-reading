import {
  SHOW_MODAL,
  HIDE_MODAL
} from '../../actions/modals/modalActions';


const initialState = {
  showingModal: false,
  component: null,
  data: null
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, { showingModal: true });

    case HIDE_MODAL:
      return Object.assign({}, state, { showingModal: false });

    default:
      return state;
  }
}
