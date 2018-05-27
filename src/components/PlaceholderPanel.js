import React from 'react';
import { connect } from 'react-redux';
import { restoreTopMenu } from '../actions/menu';

class PlaceholderPanel extends React.Component {
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
        <div className="nav-item nav-item-canceled grid-item-row1-col6">
          <p>Cancel</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  restoreTopMenu: () => dispatch(restoreTopMenu())
});

export default connect(null, mapDispatchToProps)(PlaceholderPanel);