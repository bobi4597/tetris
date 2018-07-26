import React from 'react';
import styled from 'styled-components';
import GameButton from 'tetris/control-panel/GameButton';

const StyledControlPanel = styled.div`
  flex-basis: 100px;
`;

const InfoPanel = ({ gameStarted, gamePaused, startGame, pauseGame, resumeGame }) => {

  return (
    <StyledControlPanel>
      <GameButton label="Start Game" onClickHandler={startGame} enabled={!gameStarted}/>
      <GameButton label="Pause Game" onClickHandler={pauseGame} enabled={gameStarted && !gamePaused}/>
      <GameButton label="Resume Game" onClickHandler={resumeGame} enabled={gamePaused}/>
    </StyledControlPanel>
  );
};

export default InfoPanel;
