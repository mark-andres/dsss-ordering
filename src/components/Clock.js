import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const StyledClock = styled.p`
  background: black;
  color: lightgreen;
  text-align: right;
  position: absolute;
  top: 4vh;
  right: 6vh;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5vh 0.5vw;
  width: 5.6vw;
`;

const Clock = ({time}) => {
  return (
    <StyledClock>{moment(time).format('h:mm')}</StyledClock>
  );
}

export default Clock;