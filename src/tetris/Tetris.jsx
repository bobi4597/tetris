import React from 'react';
import styled from 'styled-components';
import prepareInitialData from './sampleData';
import shapes from './shapes/index.js';

import Board from "./Board";

const BOARD_HEIGHT = 20;
const BOARD_WIDTH = 10;
const LEFT_KEY = 37;
// const UP_KEY = 38;
const RIGHT_KEY = 39;
// const DOWN_KEY = 40;

const StyledTetris = styled.main`
  display: flex;
  justify-content: center;
`;

const hasCollision = (boardData, shapeState) => {
  const shape = shapes[shapeState.index][shapeState.rotation];

  for (let r = shapeState.row; r < shapeState.row + shape.length; ++r) {
    for (let c = shapeState.col; c < shapeState.col + shape[0].length; ++c) {
      const cellRow = r - shapeState.row;
      const cellCol = c - shapeState.col;
      if (r < 0 || r >= BOARD_HEIGHT || c < 0 || c >= BOARD_WIDTH) {
        if (shape[cellRow][cellCol] !== 0) {
          return true;
        }
      } else {
        if (boardData[r][c] !== 0 && shape[cellRow][cellCol] !== 0) {
          return true;
        }
      }
    }
  }
  return false;
};

const calculateMergedBoardData = (boardData, shapeState) => {
  const mergedBoardData = boardData.map((row) => row.slice());
  const shape = shapes[shapeState.index][shapeState.rotation];

  for (let r = shapeState.row; r < shapeState.row + shape.length; ++r) {
    for (let c = shapeState.col; c < shapeState.col + shape[0].length; ++c) {
      if (r >= 0 && r < BOARD_HEIGHT && c >= 0 && c < BOARD_WIDTH && mergedBoardData[r][c] === 0) {
        mergedBoardData[r][c] = shape[r - shapeState.row][c - shapeState.col];
      }
    }
  }
  return mergedBoardData;
};

const finalizeShapeOnBoard = (boardData, shapeState) => {
  const startRow = shapeState.row;
  let shapeData = shapes[shapeState.index][shapeState.rotation];
  const endRow = startRow + shapeData.length;
  const startCol = shapeState.col;
  const endCol = startCol + shapeData[0].length;

  for (let r = startRow; r < endRow; ++r) {
    for (let c = startCol; c < endCol; ++c) {
      if (r >= 0 && r < BOARD_HEIGHT && c >= 0 && c < BOARD_WIDTH) {
        if (boardData[r][c] === 0 && shapeData[r - startRow][c - startCol] !== 0) {
          boardData[r][c] = shapeData[r - startRow][c - startCol];
        }
      }
    }
  }

  return boardData;
};

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
      100
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
        col: Math.floor(Math.random() * (BOARD_WIDTH - 4)),
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
    }
  };

  moveLeftRight = (distance) => {
    const { boardData, currentShapeState } = this.state;
    const newShapeState = {
      ...currentShapeState,
      col: currentShapeState.col + distance,
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