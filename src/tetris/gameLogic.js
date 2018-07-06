import shapes from "./shapes";

export const BOARD_HEIGHT = 20;
export const BOARD_WIDTH = 10;

/**
 * Checks whether there is a collision between the current shape and the board.
 *
 * @param boardData the representation of the board
 * @param shapeState the shape state
 * @returns {boolean} true if there is a collision, false otherwise
 */
export const hasCollision = (boardData, shapeState) => {
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

/**
 * Calculates the merged board date by merging the board date with the position of the current shape.
 *
 * @param boardData the representation of the board
 * @param shapeState the shape state
 * @returns the merged board data
 */
export const calculateMergedBoardData = (boardData, shapeState) => {
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

/**
 * Finalizes the shape on the board.
 * After this operation, the shape is part of the board and cannot be moved anymore.
 *
 * @param boardData the representation of the board
 * @param shapeState the shape state
 * @returns the board data after finalizing the current shape
 */
export const finalizeShapeOnBoard = (boardData, shapeState) => {
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
