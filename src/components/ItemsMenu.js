import React from 'react';
import SelectionMenu from './SelectionMenu';
import SizeMenu from './SizeMenu';

class ItemsMenu extends React.Component {
  render() {
    const { menu } = this.props;
    const sizes = menu.sizes;
    let sizeNames = [];
    let classes = "main-grid-cell ";
    if (sizes) {
      classes += 'selection-panel-2';
    } else {
      classes += 'selection-panel';
    }

    if (sizes) {
      for (const size in sizes) {
        sizeNames.push(sizes[size]);
      }
    }
    
    return (
      <div className={classes}>
        {!!sizes && <SizeMenu sizes={sizeNames} menu={menu} />}
        <SelectionMenu menu={menu} />
      </div>
    );
  }
}

export default ItemsMenu;