import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { restoreTopMenu, setCurrentMenu } from '../actions/menu';
import { MENU_TYPE } from '../data/menu';

class QuickNavPanel extends React.Component {
  cancelButtonActive() {
    return this.props.currentMenuType !== 'ITEMS_MENU';
  }

  modifiersButtonActive() {
    const { topMenu, selectedItem } = this.props;
    return topMenu.modifiers && selectedItem && !_.isEmpty(selectedItem);
  }

  sizesButtonActive() {
    const { topMenu, selectedItem } = this.props;
    return topMenu.sizes && selectedItem && !_.isEmpty(selectedItem);
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
        <div
          className={"nav-item grid-item-row1-col2" + (this.modifiersButtonActive() ? ' nav-item-active' : '')}
          onClick={e => {
            const { topMenu, setCurrentMenu } = this.props;

            e.preventDefault();
            if (this.modifiersButtonActive()) {
              setCurrentMenu(topMenu.modifiers);
            }
          }}
        >
          <p>Modifiers</p>
        </div>
        <div 
          className={"nav-item grid-item-row1-col3" + (this.sizesButtonActive() ? ' nav-item-active' : '')}
          onClick={e => {
            const { topMenu, setCurrentMenu } = this.props;

            e.preventDefault();
            if (this.sizesButtonActive()) {
              setCurrentMenu({
                type: MENU_TYPE.SIZES_MENU,
                sizes: Object.values(topMenu.sizes),
                modifiers: topMenu.modifiers
              });
            }
          }}
        >
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
  restoreTopMenu: () => dispatch(restoreTopMenu()),
  setCurrentMenu: menu => dispatch(setCurrentMenu(menu))
});

const mapStateToProps = state => ({
  currentMenuType: state.menu.currentMenu.type,
  topMenu: state.menu.menuStack[0],
  selectedItem: state.order.selectedItem
});

export default connect(mapStateToProps, mapDispatchToProps)(QuickNavPanel);