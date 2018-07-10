import React from 'react';
import styled from 'styled-components';
import { switchProp } from 'styled-tools';
import shapes from "../shapes";

const Container = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  height: 30px;
  line-height: 30px;
`;

const ShapeContainer = styled.div`
  border: 1px solid #dddddd;
  height: 80px;
`;

const Shape = styled.div`
  height: 80px;
  display: inline-flex;
  flex-direction: column;
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

const NextShapePreview = ({ nextShapeState }) => {
  const nextShape = shapes[nextShapeState.index][0];
  return <Container>
    <Title>Next</Title>
    <ShapeContainer>
      <Shape>
        {nextShape.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((cellData, cellIndex) => <Cell key={cellIndex} cellData={cellData}/>)}
          </Row>))
        }
      </Shape>
    </ShapeContainer>
  </Container>;
};

export default NextShapePreview;