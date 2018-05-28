import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import QualifierPanel from './QualifierPanel';
import SelectionHeader from './SelectionHeader';

class ModifiersMenu extends React.Component {
  renderModifierButtons(items) {
    return items.map(item => {
      const backgroundColor = this.props.selectedItem.includes &&
        this.props.selectedItem.includes.includes(item.name) ? '#006900' : '#0000d1';
      const style = {
          textAlign: 'center',
          borderRadius: '15%',
          overflow: 'hidden',
          color: '#e5e779',
          backgroundColor,
          fontSize: '0.9rem',
          fontWeight: 'bold',
          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          letterSpacing: '1px'
      };
      const blankStyle = {
        backgroundColor: 'transparent'
      };
      
      if (item.name === '__blank__') {
        return <div
          key={uuid()}
          style={blankStyle}
          />
      }

      return <div
        key={uuid()}
        style={style}
        id={item.name}
        onClick={e => console.log(e.target.id)}
      >
        <br />{item.name}
      </div>
    });
  }

  render() {
    const { items, name, qualifiers } = this.props.menu;
    const qualifierWidth = 100 / qualifiers.length;

    return (
      <div className="selection-menu">
        <SelectionHeader caption={name} />
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
        >{this.renderModifierButtons(items)}
        </div>
        <QualifierPanel>
          {!!qualifiers && qualifiers.map((qualifier) => {
            return (
              <button
                key={uuid()}
                id={qualifier.id}
                style={{
                  width: `${qualifierWidth}%`,
                  height: '100%',
                  padding: '0',
                  margin: '0',
                  backgroundColor: 'grey'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(`${e.target.id} clicked!`);
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
  selectedItem: state.order.selectedItem
});

export default connect(mapStateToProps)(ModifiersMenu);