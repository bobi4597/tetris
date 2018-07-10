import React from 'react';
import styled from 'styled-components';
import prepareInitialData from './sampleData';
import shapes from './shapes/index.js';

import Board from './Board';
import InfoPanel from './info-panel/InfoPanel';
import {
  calculateMergedBoardData,
  finalizeShapeOnBoard,
  hasCollision, randomShape,
} from "./gameLogic";

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
      currentShapeState: randomShape(),
      nextShapeState: randomShape(),
    };
  }

  componentDidMount() {
    this.gameTimer = setInterval(
      () => this.tick(),
      200
    );
  }

  componentWillUnmount() {
    clearInterval(this.gameTimer);
  }

  tick() {
    const { currentShapeState, nextShapeState, boardData } = this.state;

    const currentShapeStatePlusOneRow = {
      ...currentShapeState,
      row: currentShapeState.row + 1,
    };

    if (hasCollision(boardData, currentShapeStatePlusOneRow)) {
      // stop here and start with new shape from top
      const newBoardData = finalizeShapeOnBoard(boardData, currentShapeState);
      this.setState({
        boardData: newBoardData,
        currentShapeState: nextShapeState,
        nextShapeState: randomShape(),
      });
    } else {
      // fall down
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
    const {boardData, currentShapeState, nextShapeState} = this.state;
    const mergedBoardData = calculateMergedBoardData(boardData, currentShapeState);
    return <StyledTetris tabIndex="0" onKeyDown={this.handleKeyDown}>
      <Board boardData={mergedBoardData}/>
      <InfoPanel nextShapeState={nextShapeState}/>
    </StyledTetris>;
  }
}

export default Tetris;