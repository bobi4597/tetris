import React from 'react';
import styled from 'styled-components';

import Row from "./Row";

const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  padding: 1px;
`;

const Board = ({ data }) => {
  const rows = data.map((rowData, index) => <Row key={index} rowData={rowData} />);
  return <StyledBoard>{rows}</StyledBoard>;
};

export default Board;