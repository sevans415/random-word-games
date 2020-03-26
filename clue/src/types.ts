/**
 * Types
 */
export interface PlayerTracker {
  [playerName: string]: {
    answered: string[][];
    skipped: string[];
    heldClues: string[];
  };
}

export interface KnownClues {
  person: string[];
  place: string[];
  weapon: string[];
}
