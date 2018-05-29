import React from 'react';
import ChoicesItems from './ChoicesItems';
import QualifierPanel from './QualifierPanel';
import SelectionHeader from './SelectionHeader';

class ChoicesMenu extends React.Component {
  render() {
    const { items, prompt } = this.props.menu;

    return (
      <div className="selection-menu">
        <SelectionHeader caption={prompt}/>
        <ChoicesItems items={items} />
        <QualifierPanel />
      </div>
    );
  }
}

export default ChoicesMenu;