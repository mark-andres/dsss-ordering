import types from './types';

export const loadModal = (modalType, modalProps) => ({
  type: types.SHOW_MODAL,
  modalType,
  modalProps
});

export const hideModal = () => ({
  type: types.HIDE_MODAL
});