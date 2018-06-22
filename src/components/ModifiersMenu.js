import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import _ from 'lodash';
import styled from 'styled-components';
import { initQualifiers, setQualifier, setExtra, setLite, setSide } from '../actions/qualifiers';
import { changeModifier } from '../actions/order';
import { ModifiersButton, ModifiersButtonText } from './common/ModifiersButton';
import QualifierPanel from './QualifierPanel';
import SelectionHeader from './SelectionHeader';
import { getModifiersList } from '../selectors/modifiers';

const ModifierPrefix = styled.span`
  color: ${({extra}) => extra? 'red':'white'};
  font-size: 1.0rem;
  font-weight: bold;
`;

class ModifiersMenu extends React.Component {
  getModifierBg(modifier, includedModifiers) {
    let bgcolor = '#0000d1';       // a blue color for modifier not included
    if (includedModifiers) {
      const itemModifier = includedModifiers.find(included => included.name === modifier.name);
      if (itemModifier) {
        if (itemModifier.status === 'excluded') {
          bgcolor = 'darkred';       // some shade of red for a negated modifier
        }
        else {
          bgcolor = '#3daf3b';       // a green color means the modifier is included
        }
      }
    }
    return bgcolor;
  }

  modifierString(name, modifier) {
    if (!modifier) {
      return <ModifiersButtonText>{name}</ModifiersButtonText>;
    }

    const { status, attributes } = modifier;
    const { extra, lite, side } = attributes;

    if (status === 'excluded') {
      return <ModifierPrefix>NO<br/><ModifiersButtonText>{name}</ModifiersButtonText></ModifierPrefix>;
    } else if (extra > 0) {
      let digitStr = extra.toString();
      if (digitStr === '1') {
        digitStr = '';
      }
      return <ModifierPrefix extra>{digitStr}X<br/><ModifiersButtonText>{name}</ModifiersButtonText></ModifierPrefix>;
    } else if (lite) {
      return <ModifierPrefix>LITE<br/><ModifiersButtonText>{name}</ModifiersButtonText></ModifierPrefix>;
    } else if (side) {
      return <ModifierPrefix>SD<br/><ModifiersButtonText>{name}</ModifiersButtonText></ModifierPrefix>;
    } 

    return <ModifiersButtonText>{name}</ModifiersButtonText>;
  }

  getModifier(modifierId) {
    const modifiers = this.props.menu.items;
    return modifiers.find(modifier => modifier.name === modifierId);
  }

  getIncludedModifier(modifierName) {
    return this.props.includedModifiers.find(modifier => modifier.name === modifierName);
  }

  handleModifierClick = name => {
    const { selectedItem, qualifiers } = this.props;
    const modifier = this.getModifier(name);
    this.props.changeModifier(selectedItem, modifier, qualifiers);
    this.props.setExtra(0);
    this.props.setLite(false);
    this.props.setSide(false);
  }

  renderModifierButtons(modifiers) {
    const { includedModifiers } = this.props;

    return modifiers.map(modifier => {
      if (modifier.name === '__blank__') {
        return <div
          key={uuid()}
          style={{ backgroundColor: 'transparent' }}
        />
      }

      const backgroundColor = this.getModifierBg(modifier, includedModifiers);

      return <ModifiersButton
        key={uuid()}
        style={{ backgroundColor }}
        id={modifier.name}
        onClick={e => {
          e.preventDefault();
          this.handleModifierClick(modifier.name);
        }}
      >
        {this.modifierString(modifier.name, this.getIncludedModifier(modifier.name))}
      </ModifiersButton>
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
  setExtra: status => dispatch(setExtra(status)),
  setLite: status => dispatch(setLite(status)),
  setSide: status => dispatch(setSide(status)),
  changeModifier: (item, modifier, options) => dispatch(changeModifier(item, modifier, options))
});

const mapStateToProps = state => {
  const { selectedItem } = state.order;
  const { modifiers } = selectedItem;
  const { qualifiers } = state;
  const halfOrdering = _.property('order.selectedItem.scratchPad.halfOrdering')(state);
  let location = halfOrdering ? 'h1' : 'whole';

  if (qualifiers.h1) {
    location = 'h1';
  } else if (qualifiers.h2) {
    location = 'h2';
  } 
  
  return {
    selectedItem,
    includedModifiers: getModifiersList(modifiers, location),
    qualifiers,
    halfOrdering
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifiersMenu);