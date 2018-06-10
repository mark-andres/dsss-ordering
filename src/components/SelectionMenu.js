import React from 'react';
import MenuItems from './MenuItems';
import QualifierPanel from './QualifierPanel';
import SelectionHeader from './SelectionHeader';

class SelectionMenu extends React.Component {
  render() {
    const { menu } = this.props;
    const { items, name } = menu;

    return (
      <div className="selection-menu">
        <SelectionHeader caption={name}/>
        <MenuItems items={items} menu={menu} />
        <QualifierPanel />
      </div>
    );
  }
}

export default SelectionMenu;