import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const StyledClock = styled.p`
  background: transparent;
  color: white;
  float: right;
  font-weight: bold;
  margin-bottom: 0.5vh;
  padding-right: 0.5vw;
`;

const Clock = ({time}) => {
  const timeStr = moment(time).format('h:mm a');

  return (
    <StyledClock>{timeStr}</StyledClock>
  );
}

export default Clock;