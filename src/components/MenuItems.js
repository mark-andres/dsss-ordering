import React from 'react';
import MenuItem from './MenuItem';
import { determineItemWidth } from '../lib';

const MenuItems = ({ items, menu }) => {
  const menuItems = items.map(menuItem => {
    return (
      <MenuItem
        className='menu-item'
        key={menuItem.key}
        menuItem={menuItem}
        menu={menu}
        height={'19%'}
        width={determineItemWidth(items.length)}
      />
    );
  });

  return <div className='menu-items'>{menuItems}</div>;
};

export default MenuItems;
