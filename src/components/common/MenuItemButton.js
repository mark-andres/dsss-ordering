import styled from 'styled-components';

export const MenuItemButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(to right, #62e460, #62e460, #62e460)' : 
    'linear-gradient(to right, #dadada, #aeaeae)'}; 
  color: #0000d1;
  border-radius: 30%;
  height: 20%;
  width: 30%;
  margin: 1%;
  box-shadow: 6px 6px black;
  font-size: 1.1rem;
  font-weight: bold;
`;