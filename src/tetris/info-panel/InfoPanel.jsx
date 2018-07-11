import React from 'react';
import styled from 'styled-components';
import NextShapeInfo from "./NextShapeInfo";
import FullLinesInfo from "./FullLinesInfo";

const StyledInfoPanel = styled.div`
  flex-basis: 100px;
`;

const InfoPanel = ({ nextShapeState, fullLines }) => {

  return <StyledInfoPanel>
    <NextShapeInfo nextShapeState={nextShapeState} />
    <FullLinesInfo fullLines={fullLines} />
  </StyledInfoPanel>;
};

export default InfoPanel;
