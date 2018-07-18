import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Modal from './Modal';
import { hideModal } from '../../actions/modal';
import { changeItem } from '../../actions/order';

const PrepareDiv = styled.div`
  border: 0.5vw inset grey;
  border-radius: 3%;
  background-color: #8FAECF;
  padding: 4vw;
`;

const Button = styled.button`
  display: block;
  text-align: center;
  width: 20vw;
  height: 4vh;
  margin-top: 2vw;
  font-size: 1.1em;
`;

export const PREPARE_DIALOG = 'PREPARE_DIALOG';

class PrepareDialog extends React.Component {
  onNoteClicked = (note) => {
    this.props.hideModal();
    const { notes = [] } = this.props.selectedItem;
    this.props.changeItem({
      ...this.props.selectedItem,
      notes: notes.concat(note)
    });
  }

  onClose = () => {
    this.props.hideModal();
  }

  render() {
    return (
      <Modal onClose={this.onClose}>
        <PrepareDiv>
          <h1>Prepare</h1>
          { 
            this.props.prepareNotes.map((note, index) => 
              <Button 
                key={index}
                onClick={e => {
                  e.preventDefault();
                  this.onNoteClicked(e.target.innerText);
                }}
              >
                {note}
              </Button>
            )
          }
        </PrepareDiv>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  changeItem: item => dispatch(changeItem(item))
});

const mapStateToProps = state => ({
  selectedItem: state.order.selectedItem
});

export default connect(mapStateToProps, mapDispatchToProps)(PrepareDialog);