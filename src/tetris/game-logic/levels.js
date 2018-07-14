const LINES_PER_LEVEL = 10;
export const INITIAL_TICK_INTERVAL = 1000;
const TICK_INTERVAL_DECREASE_PER_LEVEL = 50;
const MINIMAL_TICK_INTERVAL = 100;

/**
 * Calculates the current level based on the number of cleared lines so far.
 * @param lines the number of cleared lines.
 * @returns {number} the current level
 */
export const getCurrentLevel = (lines = 0) => {
  return Math.floor(lines / LINES_PER_LEVEL);
};

/**
 * The tick interval will decrease by certain amount whenever the level changes.
 * Once the MINIMAL_TICK_INTERVAL has been reached, the interval will not be decreased anymore.
 *
 * @param lines the number of lines cleared so far.
 * @returns {number} the current tick interval
 */
export const getCurrentTickInterval = (lines = 0) => {
  const currentLevel = getCurrentLevel(lines);
  return Math.max(
    INITIAL_TICK_INTERVAL - (TICK_INTERVAL_DECREASE_PER_LEVEL * currentLevel),
    MINIMAL_TICK_INTERVAL);
};