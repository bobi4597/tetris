import React from 'react';
import styled from 'styled-components';
import NextShapeInfo from "tetris/info-panel/NextShapeInfo";
import FullLinesInfo from "tetris/info-panel/FullLinesInfo";
import LevelInfo from "tetris/info-panel/LevelInfo";

const StyledInfoPanel = styled.div`
  flex-basis: 100px;
`;

const InfoPanel = ({ nextShapeState, fullLines, level }) => {

  return <StyledInfoPanel>
    <NextShapeInfo nextShapeState={nextShapeState} />
    <FullLinesInfo fullLines={fullLines} />
    <LevelInfo level={level} />
  </StyledInfoPanel>;
};

export default InfoPanel;
