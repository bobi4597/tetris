import React from 'react';
import styled from 'styled-components';
import { switchProp } from 'styled-tools';

const StyledCell = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid gray;
  margin: 1px;
  background-color: ${switchProp('cellData', {
    0: 'transparent',
    1: 'red',
    "-1": 'blue',
  })};
`;

const Cell = ({ cellData }) => {
  return <StyledCell cellData={cellData} />;
};

export default Cell;