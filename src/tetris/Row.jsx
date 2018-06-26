import React from 'react';
import Cell from './Cell';

const Row = ({ rowData }) => {
  const cells = rowData.map((cellData, index) => <Cell key={index} cellData={cellData} />);
  return <tr>{cells}</tr>;
};

export default Row;

