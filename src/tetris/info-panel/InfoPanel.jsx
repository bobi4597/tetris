import React from 'react';
import styled from 'styled-components';
import NextShapeInfo from "tetris/info-panel/NextShapeInfo";
import FullLinesInfo from "tetris/info-panel/FullLinesInfo";

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
