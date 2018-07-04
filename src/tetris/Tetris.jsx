import React from 'react';
import styled from 'styled-components';
import prepareInitialData from './sampleData';
import shapes from './shapes/index.js';

import Board from "./Board";

const BOARD_HEIGHT = 20;
const BOARD_WIDTH = 10;

const StyledTetris = styled.div`
  display: flex;
  justify-content: center;
`;

function calculateMergedBoardData(boardData, currentShapeState) {
  const mergedBoardData = boardData.map((row) => row.slice());
  const shape = shapes[currentShapeState.index][currentShapeState.rotation];

  for (let r = currentShapeState.row; r < currentShapeState.row + shape.length; ++r) {
    for (let c = currentShapeState.col; c < currentShapeState.col + shape[0].length; ++c) {
      if (mergedBoardData[r][c] === 0) {
        mergedBoardData[r][c] = shape[r - currentShapeState.row][c - currentShapeState.col];
      }
    }
  }
  return mergedBoardData;
}

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
      300
    );
  }

  componentWillUnmount() {
    clearInterval(this.gameTimer);
  }

  tick() {
    // if it reached bottom we update the board data
    // 1. check if the currentPiece can move down
    // 1.1. If so, just increase the row (row ++)
    // 1.2. If NOT:
    // 1.2.1. Merge the piece with the board
    // 1.2.2. Randomly choose new piece and position it at the top (row = 0)
    if (this.state.currentShapeState.row === 16) {
      const newBoardData = Tetris.mergePieceWithBoard(this.state.currentShapeState, this.state.boardData);
      const newShape = {
        index: Math.floor(Math.random() * shapes.length),
        rotation: 0,
        row: 0,
        col: Math.floor(Math.random() * BOARD_WIDTH),
      };
      this.setState({
        boardData: newBoardData,
        currentShapeState: newShape,
      });
    } else {
      this.setState({
        boardData: this.state.boardData,
        currentShapeState: {
          ...this.state.currentShapeState,
          row: this.state.currentShapeState.row + 1,
        }
      });
    }
  }

  static mergePieceWithBoard(shapeState, boardData) {
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

  }

  render() {
    const {boardData, currentShapeState} = this.state;
    const mergedBoardData = calculateMergedBoardData(boardData, currentShapeState);
    return <StyledTetris>
      <Board boardData={mergedBoardData} />
    </StyledTetris>;
  }
}

export default Tetris;