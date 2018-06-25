import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StandardButton } from '../common/StandardButton';

const DashboardBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #8FAECF;
`;

const DashboardHeader = styled.h1`
  text-align: center;
  padding-top: 2vh;
`;

const Buttons = styled.div`
  width: 14vw;
  margin: 4vh auto;
`;

const Dashboard = () => {
  return (
    <DashboardBackground>
      <DashboardHeader>Delivery Service Support System</DashboardHeader>
      <Buttons>
        <Link to='/orderentry'>
          <StandardButton style={{ width: '10vw', height: '4vh' }}>Order Entry</StandardButton>
        </Link>
      </Buttons>
    </DashboardBackground>
  );
}

export default Dashboard;