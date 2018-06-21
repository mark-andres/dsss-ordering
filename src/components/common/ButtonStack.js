import styled from 'styled-components';

export const ButtonStack = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 100%);
  grid-template-rows: repeat(2, 48%);
  min-height: 0;
  min-width: 0;
  grid-row-gap: 4%;
`;