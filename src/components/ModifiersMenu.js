import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import QualifierPanel from './QualifierPanel';
import SelectionHeader from './SelectionHeader';

class ModifiersMenu extends React.Component {
  render() {
    const { items, name } = this.props.menu;

    return (
      <div className="selection-menu">
        <SelectionHeader caption={name}/>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 19%)',
            gridTemplateRows: 'repeat(6, 14%)',
            overflow: 'hidden',
            overflowY: 'scroll',
            height: '100%',
            paddingTop: '10px',
            paddingRight: '66px',
            paddingLeft: '5px',
            gridColumnGap: '10px',
            gridRowGap: '10px',
            backgroundColor: '#8FAECF'
          }}
        >
          {items.map(item => 
            <div 
              key={uuid()}
              style={{
                textAlign: 'center',
                borderRadius: '15%',
                overflow: 'hidden',
                color: '#e5e779',
                backgroundColor: '#EFEFEF',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                letterSpacing: '1px'
              }}
            >
              <br />{item.name}
            </div>
          )}
        </div>
        <QualifierPanel />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedItem: state.order.selectedItem
});

export default connect(mapStateToProps)(ModifiersMenu);