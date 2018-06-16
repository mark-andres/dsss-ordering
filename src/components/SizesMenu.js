import React from 'react';
import uuid from 'uuid/v1';
import QualifierPanel from './QualifierPanel';
import SelectionHeader from './SelectionHeader';
import SizeItem from './SizeItem';

class SizesMenu extends React.Component {
  render() {
    const { sizes } = this.props.menu;
    const sizeItems = sizes.map(size => {
      return <SizeItem key={uuid()} size={size} style={{width: '40%', height: '15%'}} />;
    });

    return (
        <div className="selection-menu">
          <SelectionHeader caption='Sizes' />
          <div className='menu-items'>
            {sizeItems}
          </div>
          <QualifierPanel />
        </div>
    );
  }
}

export default SizesMenu;