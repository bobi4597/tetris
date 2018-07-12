import React from 'react';
import styled from 'styled-components';
import { switchProp } from 'styled-tools';
import shapes from "tetris/shapes";

const Container = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #dddddd;
`;

const Title = styled.div`
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #dddddd;
`;

const ShapeContainer = styled.div`
  height: 80px;
`;

const Shape = styled.div`
  height: 80px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-even;
`;

const Cell = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${switchProp('cellData', {
    0: 'transparent',
    1: 'blue',
  })};
`;

const NextShapeInfo = ({ nextShapeState }) => {
  const nextShape = shapes[nextShapeState.index][0];
  return <Container>
    <Title>Next</Title>
    <ShapeContainer>
      <Shape>
      {nextShape
        .filter(row => row.some(cell => cell !== 0))
        .map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((cellData, cellIndex) => <Cell key={cellIndex} cellData={cellData}/>)}
          </Row>))
        }
      </Shape>
    </ShapeContainer>
  </Container>;
};

export default NextShapeInfo;