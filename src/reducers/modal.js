import { SHOW_MODAL, HIDE_MODAL } from '../actions/types';

const initialModalState = {
  modalType: null,
  modalProps: null
};

export default function (state = initialModalState, action) {
  const newState = { ...state };

  switch (action.type) {
    case SHOW_MODAL:
      newState.modalType = action.modalType;
      newState.modalProps = action.modalProps;
      break;

    case HIDE_MODAL: 
      return initialModalState;

    default: 
      return state;
  }

  return newState;
}