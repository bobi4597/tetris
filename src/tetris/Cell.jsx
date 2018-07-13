import React from 'react';
import styled from 'styled-components';
import { switchProp } from 'styled-tools';

const StyledCell = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  background-color: ${switchProp('cellData', {
    0: 'transparent',
    1: 'cyan',
    2: '#eeee00',
    3: 'purple',
    4: '#cc7722',
    5: 'blue',
    6: 'red',
    7: 'green',
  })};
`;

const Cell = ({ cellData }) => {
  return <StyledCell cellData={cellData} />;
};

export default Cell;