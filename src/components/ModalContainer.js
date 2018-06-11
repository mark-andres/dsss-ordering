import React from 'react';
import { connect } from 'react-redux';

import MessageModal from './MessageModal';

import { MESSAGE_MODAL } from '../lib';

const MODAL_COMPONENTS = {
  [MESSAGE_MODAL]: MessageModal
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