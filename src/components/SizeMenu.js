import React from 'react';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';
import QualifierPanel from './QualifierPanel';
import SelectionHeader from './SelectionHeader';
import SizeItem from './SizeItem';
import { setHalfOrdering } from '../actions/scratchPad';

class SizeMenu extends React.Component {
  render() {
    const { sizes, menu, halfOrdering } = this.props;
    const { qualifiers } = menu;
    const sizeItems = sizes.map(size => {
      return <SizeItem key={uuid()} size={size} />;
    });

    return (
      <div className="size-menu">
        <SelectionHeader caption='Sizes'/>
        <div className='size-items'>
          {sizeItems}        
        </div>
        <QualifierPanel>
          { !!qualifiers && qualifiers.map((qualifier) => {
            return (
              <button
                className='qualifier-button'
                key={uuid()}
                style={{
                  width: '100%',
                  backgroundColor: halfOrdering? '#3daf3b' : '#006900',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  this.props.setHalfOrdering(!halfOrdering);                  
                }}
              >
                {qualifier.name}
              </button>
            )
          })}
        </QualifierPanel>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  halfOrdering: state.scratchPad.halfOrdering
});

const mapDispatchToProps = dispatch => ({
  setHalfOrdering: halfOrdering => dispatch(setHalfOrdering(halfOrdering))
})

export default connect(mapStateToProps, mapDispatchToProps)(SizeMenu);