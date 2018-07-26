import * as React from 'react';
import styled from 'styled-components';

const StyledGameButton = styled.button`
  display: block;
  margin-bottom: 15px;
  border: 1px solid #dddddd;
  width: 100%;
`;

const GameButton = ({ label, enabled, onClickHandler }) =>
  <StyledGameButton onClick={() => onClickHandler()} disabled={!enabled}>{label}</StyledGameButton>
;

export default GameButton;