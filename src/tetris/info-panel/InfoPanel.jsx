import React from 'react';
import styled from 'styled-components';
import NextShapePreview from "./NextShapePreview";

const StyledInfoPanel = styled.div`
  flex-basis: 100px;
`;

const InfoPanel = ({ nextShapeState }) => {

  return <StyledInfoPanel>
    <NextShapePreview nextShapeState={nextShapeState} />
  </StyledInfoPanel>;
};

export default InfoPanel;
