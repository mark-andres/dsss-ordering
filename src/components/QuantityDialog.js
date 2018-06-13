import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Modal from './Modal';
import { hideModal } from '../actions/modal';

const QuantityDiv = styled.div`
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

const CancelButton = OkButton;

export const QUANTITY_DIALOG = 'QUANTITY_DIALOG';

class QuantityDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityStr: '1'
    };
  }

  onOkClicked = () => {
    this.props.hideModal();
    if (this.props.onOk) {
      const quantity = parseInt(this.state.quantityStr, 10);
      if (quantity) {
        this.props.onOk(quantity);
      }
    }
  }

  onClose = () => {
    this.props.hideModal();
  }

  onChange = e => {
    e.preventDefault();
    this.setState({ quantityStr: e.target.value });
  }

  render() {
    return (
      <Modal onClose={this.onClose}>
        <QuantityDiv>
          <fieldset>
            <legend>Enter quantity</legend>
            <input
              type='number'
              value={this.state.quantityStr}
              onChange={this.onChange}
            />
          </fieldset>
          <OkButton onClick={this.onOkClicked}>Ok</OkButton>
          <CancelButton onClick={this.onClose}>Cancel</CancelButton>
        </QuantityDiv>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
});

export default connect(null, mapDispatchToProps)(QuantityDialog);