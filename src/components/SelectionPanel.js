import React from 'react';
import { connect } from 'react-redux';
import SelectionMenu from './SelectionMenu';
import SizeMenu from './SizeMenu';

class SelectionPanel extends React.Component {
  render() {
    const sizes = this.props.currentMenu.sizes;
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
        {!!sizes && <SizeMenu sizes={sizeNames} />}
        <SelectionMenu menu={this.props.currentMenu} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentMenu: state.menu.currentMenu
});

export default connect(mapStateToProps, null)(SelectionPanel);