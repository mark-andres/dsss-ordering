import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import _ from 'lodash';
import { initQualifiers, setQualifier } from '../actions/qualifiers';
import { changeModifier } from '../actions/order';
import QualifierPanel from './QualifierPanel';
import SelectionHeader from './SelectionHeader';

class ModifiersMenu extends React.Component {
  getModifierBg(modifier, includedModifiers) {
    let bgcolor = '#0000d1';       // a blue color for modifier not included
    if (includedModifiers) {
      const itemModifier = includedModifiers.find(included => included.name === modifier.name);
      if (itemModifier) {
        if (itemModifier.flags.negated) {
          bgcolor = 'darkred';       // some shade of red for a negated modifier
        }
        else {
          bgcolor = '#006900';       // a green color means the modifier is included
        }
      }
    }
    return bgcolor;
  }

  getModifier(modifierId) {
    const modifiers = this.props.menu.items;
    return modifiers.find(modifier => modifier.name === modifierId);
  }

  handleModifierClick = e => {
    e.preventDefault();
    const { selectedItem, qualifiers } = this.props;
    this.props.changeModifier(selectedItem, this.getModifier(e.target.id), qualifiers)
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
      if (modifier.name === '__blank__') {
        return <div
          key={uuid()}
          style={{ backgroundColor: 'transparent' }}
        />
      }

      const backgroundColor = this.getModifierBg(modifier, includedModifiers);

      return <div
        className='modifiers-button'
        key={uuid()}
        style={{ backgroundColor }}
        id={modifier.name}
        onClick={this.handleModifierClick}
      >
        <br />{modifier.name}
      </div>
    });
  }

  render() {
    const { selectedItem } = this.props;
    const { name, qualifiers } = this.props.menu;
    const modifiers = this.props.menu.items;

    return (
      <div className="selection-menu">
        <SelectionHeader caption={`${name} - ${selectedItem.name}`} />

        <div className='modifiers-grid'>
          {this.renderModifierButtons(modifiers)}
        </div>

        <QualifierPanel 
          menuQualifiers={qualifiers} 
          qualifiers={this.props.qualifiers}
          halfOrdering={this.props.halfOrdering} 
          setQualifier={this.props.setQualifier}
          selectedItem={selectedItem}
          initQualifiers={this.props.initQualifiers}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  initQualifiers: (qualifiersMenu, initialPart) => dispatch(initQualifiers(qualifiersMenu, initialPart)),
  setQualifier: (qualifier, status) => dispatch(setQualifier(qualifier, status)),
  changeModifier: (item, modifier, options) => dispatch(changeModifier(item, modifier, options))
});

const mapStateToProps = state => ({
  selectedItem: state.order.selectedItem,
  qualifiers: state.qualifiers,
  halfOrdering: _.property('order.selectedItem.scratchPad.halfOrdering')(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifiersMenu);