import React from 'react';
import { connect } from 'react-redux';
import { restoreTopMenu } from '../actions/menu';

class QuickNavPanel extends React.Component {
  cancelButtonActive() {
    return this.props.currentMenuType !== 'ITEMS_MENU';
  }

  render() {
    return (
      <div className="placeholder-panel">
        <div 
          className="nav-item nav-item-active grid-item-row1-col1"
          onClick={(e) => {
            e.preventDefault();
            this.props.restoreTopMenu();
          }}
        >
          <p>Items</p>
        </div>
        <div className="nav-item grid-item-row1-col2">
          <p>Modifiers</p>
        </div>
        <div className="nav-item grid-item-row1-col3">
          <p>Sizes</p>
        </div>
        <div className="nav-item grid-item-row1-col4">
          <p>Styles</p>
        </div>
        <div className="nav-item grid-item-row1-col5">
          <p>Preferences</p>
        </div>
        <div 
          className={"nav-item grid-item-row1-col6" + (this.cancelButtonActive() ? ' nav-item-canceled' : '')}
          onClick={e => {
            e.preventDefault();
            if (this.cancelButtonActive()) {
              this.props.restoreTopMenu();
            }
          }}
        >
          <p>Cancel</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  restoreTopMenu: () => dispatch(restoreTopMenu())
});

const mapStateToProps = state => ({
  currentMenuType: state.menu.currentMenu.type
});

export default connect(mapStateToProps, mapDispatchToProps)(QuickNavPanel);