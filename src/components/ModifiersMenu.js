import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import _ from 'lodash';
import { initQualifiers, setQualifier } from '../actions/qualifiers';
import { changeModifier } from '../actions/order';
import { ModifiersButton } from './common/ModifiersButton';
import QualifierPanel from './QualifierPanel';
import SelectionHeader from './SelectionHeader';
import { getModifiersList } from '../selectors/modifiers';

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
        onClick={this.handleModifierClick}
      >
        {modifier.name}
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