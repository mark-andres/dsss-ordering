import React from 'react';
import uuid from 'uuid/v1';
import ChoicesItem from './ChoicesItem';

const ChoicesItems = ({ items }) => {
  const menuItems = items.map(menuItem => {
    return <ChoicesItem
      className="menu-item"
      key={uuid()} menuItem={menuItem}
    />;
  });

  return (
    <div className="menu-items">
      {menuItems}
    </div>
  );
}

export default ChoicesItems;