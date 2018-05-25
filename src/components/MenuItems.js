import React from 'react';
import MenuItem from './MenuItem';

const MenuItems = ({ items }) => {
  const menuItems = items.map(menuItem => {
    return <MenuItem
      className="menu-item"
      key={menuItem.key} menuItem={menuItem}
    />;
  });

  return (
    <div className="menu-items">
      {menuItems}
    </div>
  );
}

export default MenuItems;