import React from 'react';
import MenuItems from './MenuItems';
import QualifierPanel from './QualifierPanel';
import SelectionHeader from './SelectionHeader';

class SelectionMenu extends React.Component {
  render() {
    const { items, name } = this.props.menu;

    return (
      <div className="selection-menu">
        <SelectionHeader caption={name}/>
        <MenuItems items={items} />
        <QualifierPanel />
      </div>
    );
  }
}

export default SelectionMenu;