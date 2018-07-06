import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Modal from './Modal';
import { hideModal } from '../../actions/modal';

const QuantityDiv = styled.div`
  border: 0.5vw inset grey;
  border-radius: 3%;
  background-color: white;
  padding: 4vw;
`;

const DialogHeading = styled.h1`
  margin-bottom: 2vh;
`;

const NumberDisplayArea = styled.div`
  display: table-cell;
  text-align: right;
  vertical-align: center;
  border: 1px solid black;
  height: 6vh;
  width: 20.1vw;
  padding-top: 3px;
  padding-right: 3px;
  font-size: 1.5em;
`;

const NumberInputButtons = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
`;

const NumberButton = styled.button`
  height: 6vh; 
  font-size: 1.5em;
`;

const DeleteButton = styled.button`
  height: 6vh; 
  font-size: 1.3em;
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
      quantityStr: ''
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

  onNumberButtonClicked = e => {
    e.preventDefault();

    const digit = e.target.innerText;
    const quantityStr = this.state.quantityStr;
    this.setState({ quantityStr: quantityStr + digit });
  }

  removeDigit = e => {
    e.preventDefault();

    const quantityStr = this.state.quantityStr;
    if (quantityStr.length) {
      this.setState({ quantityStr: quantityStr.substr(0, quantityStr.length - 1) });
    }
  }

  render() {
    return (
      <Modal onClose={this.onClose}>
        <QuantityDiv>
          <DialogHeading>Enter quantity:</DialogHeading>          
          <NumberDisplayArea>{this.state.quantityStr}</NumberDisplayArea>
          <NumberInputButtons>
            <NumberButton onClick={this.onNumberButtonClicked}>7</NumberButton>
            <NumberButton onClick={this.onNumberButtonClicked}>8</NumberButton>
            <NumberButton onClick={this.onNumberButtonClicked}>9</NumberButton>
            <NumberButton onClick={this.onNumberButtonClicked}>4</NumberButton>
            <NumberButton onClick={this.onNumberButtonClicked}>5</NumberButton>
            <NumberButton onClick={this.onNumberButtonClicked}>6</NumberButton>
            <NumberButton onClick={this.onNumberButtonClicked}>1</NumberButton>
            <NumberButton onClick={this.onNumberButtonClicked}>2</NumberButton>
            <NumberButton onClick={this.onNumberButtonClicked}>3</NumberButton>
            <NumberButton onClick={this.onNumberButtonClicked}>0</NumberButton>
            <NumberButton disabled>.</NumberButton>
            <DeleteButton onClick={this.removeDigit}>Del</DeleteButton>
          </NumberInputButtons> 
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