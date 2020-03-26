import { KnownClues, PlayerTracker } from "./types";

/**
 * Helper functions
 */

const range = (start: number, end: number) =>
  Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);

export const determinePlayersInBetween = (
  asked: string,
  answered: string,
  playerOrder: string[]
): string[] => {
  // double it so that it loops around to the top
  const doublePlayerOrder = [...playerOrder, ...playerOrder];
  const askedIdx = doublePlayerOrder.indexOf(asked);
  const answeredIdx = doublePlayerOrder.indexOf(answered, askedIdx);
  if (askedIdx + 1 === answeredIdx) return [];
  return range(askedIdx + 1, answeredIdx - 1).map(
    nameIdx => doublePlayerOrder[nameIdx]
  );
};

export const generateKnownClues = (): KnownClues => ({
  person: [],
  place: [],
  weapon: []
});

export const generatePlayerTracker = (playerOrder: string[]) =>
  playerOrder.reduce((agg, currentPlayer) => {
    agg[currentPlayer] = {
      answered: [],
      skipped: [],
      heldClues: []
    };
    return agg;
  }, {} as PlayerTracker);
