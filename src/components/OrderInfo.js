import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import { setTime } from '../actions/clock';
import Clock from './Clock';
import { StandardButton } from './common/StandardButton';

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

const StyledLink = styled(Link)`
  width: 8vw;
  height: 5vh;
  position: absolute;
  top: 1.5vh;
  right: 1.5vw;
`;

const CustomerButton = StandardButton.extend`
/*  width: 7vw; */
/*  height: 4vh; */
/*  float: right; */
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
          <StyledLink to='/customer'>
            <CustomerButton>Customer</CustomerButton>
          </StyledLink>
        </DisplayArea>
      </StyledOrderInfo>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setTime: time => dispatch(setTime(time))
});

const mapStateToProps = state => ({
  clock: state.clock.time,
  userName: state.user.loggedIn ? `${state.user.firstname} ${state.user.lastname}` : ''
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);