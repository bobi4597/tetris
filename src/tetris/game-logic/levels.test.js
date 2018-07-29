import {
  LINES_PER_LEVEL,
  INITIAL_TICK_INTERVAL,
  TICK_INTERVAL_DECREASE_PER_LEVEL,
  MINIMAL_TICK_INTERVAL,
  getCurrentLevel,
  getCurrentTickInterval,
} from 'tetris/game-logic/levels';

describe('Tests for the getCurrentLevel function', () => {
  it ('should return 0 when the "lines" parameter is not passed', () => {
    expect(getCurrentLevel()).toEqual(0);
  });

  it ('should return 0 when the "lines" parameter is 0', () => {
    expect(getCurrentLevel(0)).toEqual(0);
  });

  it (`should return 0 when the number of lines is ${LINES_PER_LEVEL - 1} (upper border for level 0)`, () => {
    expect(getCurrentLevel(LINES_PER_LEVEL - 1)).toEqual(0);
  });

  it (`should return 1 when the number of lines is ${LINES_PER_LEVEL} (lower border for level 1)`, () => {
    expect(getCurrentLevel(LINES_PER_LEVEL)).toEqual(1);
  });

  it (`should return 1 when the number of lines is ${2 * LINES_PER_LEVEL - 1} (upper border for level 1)`, () => {
    expect(getCurrentLevel(2 * LINES_PER_LEVEL - 1)).toEqual(1);
  });

  it (`should return 1 when the number of lines is ${2 * LINES_PER_LEVEL} (lower border for level 2)`, () => {
    expect(getCurrentLevel(2 * LINES_PER_LEVEL)).toEqual(2);
  });

  it (`should return 1 when the number of lines is ${10 * LINES_PER_LEVEL - 1} (upper border for level 9)`, () => {
    expect(getCurrentLevel(10 * LINES_PER_LEVEL - 1)).toEqual(9);
  });

  it (`should return 10 when the number of lines is ${10 * LINES_PER_LEVEL} (lower border for level 10)`, () => {
    expect(getCurrentLevel(10 * LINES_PER_LEVEL)).toEqual(10);
  });
});

describe('Test for the getCurrentTickInterval function', () => {
  it (`should return ${INITIAL_TICK_INTERVAL} (the initial tick interval) when no parameter is passed`, () => {
    expect(getCurrentTickInterval()).toEqual(INITIAL_TICK_INTERVAL);
  });

  it (`should return ${INITIAL_TICK_INTERVAL} (the initial tick interval) when number of lines is 0`, () => {
    expect(getCurrentTickInterval(0)).toEqual(INITIAL_TICK_INTERVAL);
  });

  it (`should return ${INITIAL_TICK_INTERVAL - TICK_INTERVAL_DECREASE_PER_LEVEL}  when number of lines is 10`, () => {
    expect(getCurrentTickInterval(10)).toEqual(INITIAL_TICK_INTERVAL - TICK_INTERVAL_DECREASE_PER_LEVEL);
  });

  it (`should return ${INITIAL_TICK_INTERVAL - 2 * TICK_INTERVAL_DECREASE_PER_LEVEL} when number of lines is 20`, () => {
    expect(getCurrentTickInterval(20)).toEqual(INITIAL_TICK_INTERVAL - 2 * TICK_INTERVAL_DECREASE_PER_LEVEL);
  });

  it (`should return ${MINIMAL_TICK_INTERVAL} when number of lines is 180`, () => {
    expect(getCurrentTickInterval(180)).toEqual(MINIMAL_TICK_INTERVAL);
  });

  it (`should return ${MINIMAL_TICK_INTERVAL} when number of lines is bigger than 180`, () => {
    expect(getCurrentTickInterval(1000)).toEqual(MINIMAL_TICK_INTERVAL);
  });
});