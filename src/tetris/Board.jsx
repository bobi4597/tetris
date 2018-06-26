import React from 'react';
import Row from "./Row";

const Board = ({ data }) => {
  const rows = data.map((rowData, index) => <Row key={index} rowData={rowData} />);
  return <table><tbody>{rows}</tbody></table>;
};

export default Board;