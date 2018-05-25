import React from 'react';
import QualifierPanel from './QualifierPanel';
import SelectionHeader from './SelectionHeader';
import SizeItem from './SizeItem';
import uuid from 'uuid/v1';

class SizeMenu extends React.Component {
  render() {
    const { sizes } = this.props;
    const sizeItems = sizes.map(size => {
      return <SizeItem key={uuid()} size={size} />;
    });

    return (
      <div className="size-menu">
        <SelectionHeader caption='Sizes'/>
        <div className='size-items'>
          {sizeItems}        
        </div>
        <QualifierPanel />
      </div>
    );
  }
}

export default SizeMenu;