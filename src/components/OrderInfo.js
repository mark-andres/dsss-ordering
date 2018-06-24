import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import { setTime } from '../actions/clock';
import Clock from './Clock';

const StyledOrderInfo = styled.div`
  position: relative;
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
  font-size: 0.8rem;
`;

class OrderInfo extends React.Component {
  componentDidMount() {
    this.setClock();
  }

setClock = () => {
  const { setTime } = this.props;
  const now = moment();
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
        </OrderInfoHeader>
        <Clock time={this.props.clock} />
      </StyledOrderInfo>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setTime: time => dispatch(setTime(time))
});

export default connect(state => state.clock, mapDispatchToProps)(OrderInfo);