import React from 'react';
import { connect } from 'react-redux';

import MessageModal, { MESSAGE_MODAL } from './modals/MessageModal';
import ConfirmDialog, { CONFIRM_DIALOG } from './modals/ConfirmDialog';
import QuantityDialog, { QUANTITY_DIALOG } from './modals/QuantityDialog';
import LoginDialog, { LOGIN_DIALOG } from './modals/LoginDialog';
import PrepareDialog, { PREPARE_DIALOG } from './modals/PrepareDialog';

const MODAL_COMPONENTS = {
  [MESSAGE_MODAL]: MessageModal,
  [CONFIRM_DIALOG]: ConfirmDialog,
  [QUANTITY_DIALOG]: QuantityDialog,
  [LOGIN_DIALOG]: LoginDialog,
  [PREPARE_DIALOG]: PrepareDialog
};

const ModalContainer = (props) => {
  if (!props.modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[props.modalType];

  return <SpecificModal {...props.modalProps} />;
};

const mapStateToProps = state => ({
    modalType: state.modal.modalType,
    modalProps: state.modal.modalProps
});

export default connect(mapStateToProps)(ModalContainer);