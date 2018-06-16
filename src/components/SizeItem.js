import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/order';
import { setItemSize, resetScratch } from '../actions/scratchPad';

class SizeItem extends React.Component {
  isSet() {
    if (this.props.scratchPad === undefined) {
      return false;
    }
    if (this.props.scratchPad.size) {
      return this.props.scratchPad.size === this.props.size;    
    }
    return false;
  }
  
  onClick = () => {
    const size = this.props.size;
    this.props.setItemSize(size);
  }

  render() {
    const size = this.props.size;
    let classes = 'size-item';

    if (this.isSet()) {
      classes += ' size-item-set';
    }

    return (
      <div 
        className={classes}
        style={this.props.style}
        onClick={this.onClick}
      >
        <p>{size}</p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setItemSize: size => dispatch(setItemSize(size)),
  resetScratch: () => dispatch(resetScratch()),
  addItem: item => dispatch(addItem(item))
});

const mapStateToProps = state => ({
  scratchPad: state.scratchPad
});

export default connect(mapStateToProps, mapDispatchToProps)(SizeItem);