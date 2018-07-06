import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Modal from './Modal';
import { hideModal } from '../../actions/modal';

const MessageDiv = styled.div`
  border: 0.5vw inset grey;
  border-radius: 3%;
  background-color: white;
  padding: 4vw;
`;

const OkButton = styled.button`
  width: 8vw;
  height: 4vh;
  margin-top: 2vw;
  font-size: 1.1em;
`;

export const MESSAGE_MODAL = 'MESSAGE_MODAL';

class MessageModal extends React.Component {
  onClose = () => {
    this.props.hideModal();
  }

  render() {
    return (
      <Modal onClose={this.onClose}>
        <MessageDiv>
          <h3>{this.props.message}</h3>
          <OkButton onClick={this.onClose}>Ok</OkButton>
        </MessageDiv>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
});

export default connect(null, mapDispatchToProps)(MessageModal);