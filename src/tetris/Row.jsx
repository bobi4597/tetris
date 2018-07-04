import React from 'react';
import styled from 'styled-components';

import Cell from './Cell';

const StyledRow = styled.div`
  display: flex;
  justify-content: space-even;
`;

const Row = ({ rowData, rowIndex, shapeState }) => {
  const cells = rowData.map((cellData, index) =>
    <Cell key={index} cellData={cellData} />
  );
  return <StyledRow>{cells}</StyledRow>;
};

export default Row;

