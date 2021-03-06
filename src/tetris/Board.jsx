import React from 'react';
import styled from 'styled-components';

import Row from "tetris/Row";

const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
`;

const Board = ({ boardData }) => {
  const rows = boardData.map((rowData, index) => <Row key={index} rowData={rowData} />);
  return <StyledBoard>{rows}</StyledBoard>;
};

export default Board;