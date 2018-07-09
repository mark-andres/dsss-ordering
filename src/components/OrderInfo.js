import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import { setTime } from '../actions/clock';
import Clock from './Clock';
import { StandardButton } from './common/StandardButton';
import { loadModal } from '../actions/modal';
import { LOGIN_DIALOG } from './modals/LoginDialog';

const StyledOrderInfo = styled.div`
`;

const OrderInfoHeader = styled.div`
  background-color: #0000d1;
  color: white;
  width: 100%;
  padding: 3px 1px;
`;

const OrderNumber = styled.span`
  font-weight: bold;
`;

const OrderNumberLabel = styled.span`
`;

const UserName = styled.span`
  font-weight: bold;
`;

const UserNameLabel = styled.span`
  padding-left: 3vw;
  padding-right: 0.5vw;
`;

const DisplayArea = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const CustomerButton = StandardButton.extend`
  width: 8vw;
  height: 5vh;
  position: absolute;
  top: 1.5vh;
  right: 1.5vw;
`;

class OrderInfo extends React.Component {
  componentDidMount() {
    this.setClock();
  }

  setClock = () => {
    const { setTime } = this.props;
    const now = new Date();
    const ticks = moment(now).add(1, 'm').startOf('m').diff(now);

    setTime(now);
    setTimeout(this.setClock, ticks);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  onCustomerButtonClick = e => {
    e.preventDefault();

    if (this.props.userName === '') {
      this.props.loadModal(LOGIN_DIALOG, { 
        allowCancel: true, 
        onSuccess: () => {
          this.context.router.history.push('/customer');
        }
      });
    } else {
      this.context.router.history.push('/customer');
    }
  }

  render() {
    return (
      <StyledOrderInfo className="main-grid-cell">
        <OrderInfoHeader>
          <OrderNumberLabel>Order #: </OrderNumberLabel>
          <OrderNumber>{' '}New</OrderNumber>
          <UserNameLabel>User:</UserNameLabel>
          <UserName>{this.props.userName}</UserName>
          <Clock time={this.props.clock} />
        </OrderInfoHeader>
        <DisplayArea>
          <CustomerButton onClick={this.onCustomerButtonClick}>Customer</CustomerButton>
        </DisplayArea>
      </StyledOrderInfo>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setTime: time => dispatch(setTime(time)),
  loadModal: (modalType, modalProps) => dispatch(loadModal(modalType, modalProps)),
});

const mapStateToProps = state => ({
  clock: state.clock.time,
  userName: state.user.loggedIn ? `${state.user.firstname} ${state.user.lastname}` : ''
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);