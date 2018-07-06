import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Modal from './Modal';
import { hideModal } from '../../actions/modal';

const ConfirmDiv = styled.div`
  border: 0.5vw inset grey;
  border-radius: 3%;
  background-color: white;
  padding: 4vw;
`;

const YesButton = styled.button`
  width: 8vw;
  height: 4vh;
  margin-top: 2vw;
  font-size: 1.1em;
`;

const NoButton = YesButton;

export const CONFIRM_DIALOG = 'CONFIRM_DIALOG';

class ConfirmDialog extends React.Component {
  onYesClicked = () => {
    this.props.hideModal();
    if (this.props.onYes) {
      this.props.onYes();
    }
  }

  onClose = () => {
    this.props.hideModal();
  }

  render() {
    return (
      <Modal onClose={this.onClose}>
        <ConfirmDiv>
          <h3>{this.props.message}</h3>
          <YesButton onClick={this.onYesClicked}>Yes</YesButton>
          <NoButton onClick={this.onClose}>No</NoButton>
        </ConfirmDiv>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
});

export default connect(null, mapDispatchToProps)(ConfirmDialog);