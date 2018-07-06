import React from 'react';
import styled from 'styled-components';
import prepareInitialData from './sampleData';
import shapes from './shapes/index.js';

import Board from "./Board";
import {
  calculateMergedBoardData,
  finalizeShapeOnBoard,
  hasCollision,
} from "./gameLogic";

const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
// const DOWN_KEY = 40;

const StyledTetris = styled.main`
  display: flex;
  justify-content: center;
`;

class Tetris extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      boardData: prepareInitialData(),
      currentShapeState: {
        index: 0,
        rotation: 0,
        row: 0,
        col: 0,
      }
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
    const { currentShapeState, boardData } = this.state;

    const nextShapeState = {
      ...currentShapeState,
      row: currentShapeState.row + 1,
    };

    if (hasCollision(boardData, nextShapeState)) {
      // stop here and start with new shape from top
      const newBoardData = finalizeShapeOnBoard(boardData, currentShapeState);
      const newShapeState = {
        index: Math.floor(Math.random() * shapes.length),
        rotation: 0,
        row: 0,
        col: Math.floor(Math.random() * (boardData[0].length - 4)),
      };
      this.setState({
        boardData: newBoardData,
        currentShapeState: newShapeState,
      });
    } else {
      // fall down
      this.setState({
        boardData: boardData,
        currentShapeState: nextShapeState,
      });
    }
  }

  handleKeyDown = (event) => {
    if (event.keyCode === LEFT_KEY) {
      this.moveLeftRight(-1);
    } else if (event.keyCode === RIGHT_KEY) {
      this.moveLeftRight(1);
    } else if (event.keyCode === UP_KEY) {
      this.rotate();
    }
  };

  moveLeftRight = (direction) => {
    const { boardData, currentShapeState } = this.state;
    const newShapeState = {
      ...currentShapeState,
      col: currentShapeState.col + direction,
    };
    if (!hasCollision(boardData, newShapeState)) {
      this.setState({
        ...this.state,
        currentShapeState: newShapeState,
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
    const {boardData, currentShapeState} = this.state;
    const mergedBoardData = calculateMergedBoardData(boardData, currentShapeState);
    return <StyledTetris tabIndex="0" onKeyDown={this.handleKeyDown}>
      <Board boardData={mergedBoardData} />
    </StyledTetris>;
  }
}

export default Tetris;