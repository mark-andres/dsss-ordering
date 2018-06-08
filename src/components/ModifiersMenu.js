import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import { initQualifiers } from '../actions/qualifiers';
import QualifierPanel from './QualifierPanel';
import SelectionHeader from './SelectionHeader';

class ModifiersMenu extends React.Component {
  componentDidMount() {
    const { qualifiers } = this.props.menu;
    const { selectedItem } = this.props;
    if (qualifiers) {
      let initialPart;
      if (selectedItem.modifiers) {
        initialPart = 'whole';
      } else if (selectedItem.modifiersH1) {
        initialPart = 'h1';
      } else {
        initialPart = 'whole';
      }
      this.props.initQualifiers(qualifiers, initialPart);
    }
  }

  getModifierBg(modifier, includedModifiers) {
    let bgcolor = '#0000d1';       // a blue color for modifier not included
    if (includedModifiers) {
      const itemModifier = includedModifiers.find(included => included.name === modifier.name);
      if (itemModifier) {
        if (!itemModifier.flags.negated) {
          bgcolor = '#006900';       // a green color means the modifier is included
        }
      }
    }
    return bgcolor;
  }

  renderModifierButtons(modifiers) {
    let includedModifiers = [];
    const { selectedItem, qualifiers } = this.props;
    const { part } = qualifiers.flags;

    if (part) {
      switch (part) {
        case 'h1':
          includedModifiers = selectedItem.modifiersH1;
          break;
        case 'h2':
          includedModifiers = selectedItem.modifiersH2;
          break;
        default:
          includedModifiers = selectedItem.modifiers;
      }
    } else {
      if (selectedItem.modifiers) {
        includedModifiers = selectedItem.modifiers;
      } else if (selectedItem.modifiersH1) {
        includedModifiers = selectedItem.modifiersH1;
      }
    }

    return modifiers.map(modifier => {
      const backgroundColor = this.getModifierBg(modifier, includedModifiers);
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
      
      if (modifier.name === '__blank__') {
        return <div
          key={uuid()}
          style={blankStyle}
          />
      }

      return <div
        key={uuid()}
        style={style}
        id={modifier.name}
        onClick={e => console.log(e.target.id)}
      >
        <br />{modifier.name}
      </div>
    });
  }

  render() {
    const { name, qualifiers } = this.props.menu;
    const modifiers = this.props.menu.items;
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
        >
          {this.renderModifierButtons(modifiers)}
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
                  backgroundColor: '#006900',
                  color: 'white',
                  fontWeight: 'bold'
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

const mapDispatchToProps = dispatch => ({
  initQualifiers: (qualifiersMenu, initialPart) => dispatch(initQualifiers(qualifiersMenu, initialPart))
});

const mapStateToProps = state => ({
  selectedItem: state.order.selectedItem,
  qualifiers: state.qualifiers
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifiersMenu);