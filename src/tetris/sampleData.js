import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
} from "tetris/gameLogic";

const prepareInitialData = (value = 0) => {
  const data = [];
  for (let i = 0; i < BOARD_HEIGHT; ++i) {
    const row = [];
    for (let j = 0; j < BOARD_WIDTH; ++j) {
      row.push(value);
    }
    data.push(row);
  }
  return data;
};

export default prepareInitialData;
