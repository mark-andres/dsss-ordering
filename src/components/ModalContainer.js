import React from 'react';
import { connect } from 'react-redux';

import MessageModal, { MESSAGE_MODAL } from './MessageModal';
import ConfirmDialog, { CONFIRM_DIALOG } from './ConfirmDialog';
import QuantityDialog, { QUANTITY_DIALOG } from './QuantityDialog';

const MODAL_COMPONENTS = {
  [MESSAGE_MODAL]: MessageModal,
  [CONFIRM_DIALOG]: ConfirmDialog,
  [QUANTITY_DIALOG]: QuantityDialog
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