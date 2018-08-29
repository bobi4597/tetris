import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import prepareInitialData from 'tetris/sampleData';
import shapes from 'tetris/shapes';

import Board from 'tetris/Board';
import ControlPanel from "tetris/control-panel/ControlPanel";
import InfoPanel from 'tetris/info-panel/InfoPanel';
import {
  calculateMergedBoardData,
  finalizeShapeOnBoard,
  hasCollision, randomShape,
} from "./gameLogic";
import {
  getCurrentLevel,
  getCurrentTickInterval,
  INITIAL_TICK_INTERVAL,
} from "tetris/game-logic/levels";

const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;

const StyledTetris = styled.main`
  display: flex;
  justify-content: space-around;
`;

class Tetris extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      boardData: prepareInitialData(),
      gameStarted: false,
      gamePaused: false,
    };
  }

  componentDidMount() {
    // do not start the game here
  }

  focusTetrisDiv() {
    ReactDOM.findDOMNode(this.refs.tetrisDiv).focus();
  }

  startGame() {
    this.setState({
      boardData: prepareInitialData(),
      currentShapeState: randomShape(),
      nextShapeState: randomShape(),
      gameStarted: true,
      gamePaused: false,
      fullLines: 0,
      level: 0,
    });
    this.startGameTimer();
    this.focusTetrisDiv();
  }

  pauseGame() {
    clearInterval(this.gameTimer);
    this.setState({
      ...this.state,
      gamePaused: true,
    });
  }

  resumeGame() {
    this.setState({
      ...this.state,
      gamePaused: false,
    });
    this.startGameTimer();
    this.focusTetrisDiv();
  }

  gameOver() {
    clearInterval(this.gameTimer);
  }

  startGameTimer() {
    this.gameTimer = setInterval(
      () => this.tick(),
      getCurrentTickInterval(this.state.fullLines)
    );
  }

  componentWillUnmount() {
    clearInterval(this.gameTimer);
  }

  setSpeed(interval = INITIAL_TICK_INTERVAL) {
    clearInterval(this.gameTimer);
    this.gameTimer = setInterval(
      () => this.tick(),
      interval,
    );
  }

  tick() {
    const { currentShapeState, nextShapeState, boardData, fullLines, level } = this.state;
    // 1. Check for "Game Over"
    if (hasCollision(boardData, currentShapeState)) {
      const { newBoardData } = finalizeShapeOnBoard(boardData, currentShapeState);
      this.setState({
        ...this.state,
        boardData: newBoardData,
        gameStarted: false,
        gamePaused: false,
      });
      this.gameOver();
      return;
    }
    // 2. If not Game Over, check if the shape can still fall down
    const currentShapeStatePlusOneRow = {
      ...currentShapeState,
      row: currentShapeState.row + 1,
    };

    if (hasCollision(boardData, currentShapeStatePlusOneRow)) {
      // 2.1. cannot fall anymore
      const { newBoardData, numberOfFullLines } = finalizeShapeOnBoard(boardData, currentShapeState);
      const newFullLines = fullLines + numberOfFullLines;
      const newLevel = getCurrentLevel(newFullLines);
      if (newLevel !== level) {
        this.setSpeed(getCurrentTickInterval(newFullLines));
      }
      // add new shape
      this.setState({
        ...this.state,
        boardData: newBoardData,
        currentShapeState: nextShapeState,
        nextShapeState: randomShape(),
        fullLines: newFullLines,
        level: newLevel,
      });
    } else {
      // 2.2. still falling down
      this.setState({
        ...this.state,
        currentShapeState: currentShapeStatePlusOneRow,
      });
    }
  }

  handleKeyDown = (event) => {
    if (event.keyCode === LEFT_KEY) {
      this.move(-1, 0);
    } else if (event.keyCode === RIGHT_KEY) {
      this.move(1, 0);
    } else if (event.keyCode === UP_KEY) {
      this.rotate();
    } else if (event.keyCode === DOWN_KEY) {
      this.move(0, 1);
    }
  };

  move = (horizontalDirection, verticalDirection) => {
    const { boardData, currentShapeState } = this.state;
    const currentShapeStateAfterMove = {
      ...currentShapeState,
      col: currentShapeState.col + horizontalDirection,
      row: currentShapeState.row + verticalDirection,
    };
    if (!hasCollision(boardData, currentShapeStateAfterMove)) {
      this.setState({
        ...this.state,
        currentShapeState: currentShapeStateAfterMove,
      })
    }
  };

  rotate = () => {
    const { boardData, currentShapeState } = this.state;
    const { index, rotation } = currentShapeState;
    const newShapeState = {
        ...currentShapeState,
      rotation: (rotation - 1 + shapes[index].length) % shapes[index].length,
    };
    if (!hasCollision(boardData, newShapeState)) {
      this.setState({
        ...this.state,
        currentShapeState: newShapeState,
      })
    }
  };

  render() {
    const {
      boardData, currentShapeState, nextShapeState, fullLines, level, gameStarted, gamePaused,
    } = this.state;
    const mergedBoardData = gameStarted ? calculateMergedBoardData(boardData, currentShapeState) : boardData;

    return (
      <StyledTetris ref="tetrisDiv" tabIndex="0" onKeyDown={this.handleKeyDown}>
        <ControlPanel gameStarted={gameStarted}
                      gamePaused={gamePaused}
                      startGame={() => this.startGame()}
                      pauseGame={() => this.pauseGame()}
                      resumeGame={() => this.resumeGame()}/>
        <Board boardData={mergedBoardData}/>
        <InfoPanel nextShapeState={nextShapeState} fullLines={fullLines} level={level}/>
      </StyledTetris>
    );
  }
}

export default Tetris;