import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { StandardButton } from './common/StandardButton';
import { ButtonStack } from './common/ButtonStack';
import { sendOrder } from '../actions/order';
import { restoreTopMenu } from '../actions/menu';
import { loadModal } from '../actions/modal';
import { logoutUser } from '../actions/user';
import { MESSAGE_MODAL } from '../components/modals/MessageModal';
import { LOGIN_DIALOG } from './modals/LoginDialog';

class OrderOperations extends React.Component {
  logInOut = () => {
    if (this.props.loggedIn) {
      this.props.logoutUser();
    } else {
      this.props.loadModal(LOGIN_DIALOG, { allowCancel: true });
    }
  }

  onSendOrder = () => {
    this.props.sendOrder();
    this.props.restoreTopMenu();
  };

  onNotImplementedClicked = e => {
    this.props.loadModal(MESSAGE_MODAL, { message: `Button '${e.target.innerText}' has not been implemented.` });
  }

  render() {
    return (
      <div className="main-grid-cell order-ops">
        <StandardButton
          style={{ height: '100%', color: 'red', fontSize: '1.4rem', gridRow: 1, gridColumn: 1 }}
          onClick={this.logInOut}
        >
          { this.props.loggedIn ? 'Logoff' : 'Login' }
        </StandardButton>
        <StandardButton
          style={{ color: 'green', fontSize: '1.4rem', gridRow: 1, gridColumn: 2 }}
          onClick={this.onNotImplementedClicked}
        >
          Drivers
        </StandardButton>
        <ButtonStack
          style={{ gridRow: 1, gridColumn: 3 }}
        >
          <StandardButton
            style={{ fontSize: '1.0rem', gridRow: 1, gridColumn: 1 }}
            onClick={this.onNotImplementedClicked}
          >
            Order Lookup
          </StandardButton>
          <StandardButton
            style={{ fontSize: '1.0rem', gridRow: 2, gridColumn: 1 }}
            onClick={this.onNotImplementedClicked}
          >
            Print
          </StandardButton>
        </ButtonStack>
        <ButtonStack
          style={{ gridRow: 1, gridColumn: 4 }}
        >
          <StandardButton
            style={{ fontSize: '1.0rem', gridRow: 1, gridColumn: 1 }}
            onClick={this.onNotImplementedClicked}
          >
            Defer Order
          </StandardButton>
          <Link to='/'>
            <StandardButton
              style={{ height: '100%', color: 'red', fontSize: '1.0rem', gridRow: 2, gridColumn: 1 }}
            >
              Exit
          </StandardButton>
          </Link>
        </ButtonStack>
        <StandardButton
          style={{ color: 'darkgoldenrod', fontSize: '1.4rem', gridRow: 1, gridColumn: 5 }}
          onClick={this.onNotImplementedClicked}
        >
          Send
        </StandardButton>
        <StandardButton
          style={{ color: 'green', fontSize: '1.4rem', gridRow: 1, gridColumn: 6 }}
          onClick={this.onNotImplementedClicked}
        >
          FAQ
        </StandardButton>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendOrder: () => dispatch(sendOrder()),
  restoreTopMenu: () => dispatch(restoreTopMenu()),
  loadModal: (modalType, modalProps) => dispatch(loadModal(modalType, modalProps)),
  logoutUser: () => dispatch(logoutUser())
});

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderOperations);