import { KnownClues, PlayerTracker } from "./types";
import { ALL_CLUES } from "./constants";
import { determinePlayersInBetween } from "./helpers";

/**
 * Core functions
 */

export const addClue = (
  knownClues: KnownClues,
  playerHoldingClue: string,
  clue: string,
  players: PlayerTracker,
  debug: boolean = false
) => {
  console.log(clue);
  const clueCategory = Object.keys(ALL_CLUES).find(category =>
    // @ts-ignore
    ALL_CLUES[category].includes(clue)
  );
  if (clueCategory === undefined) {
    throw new Error(`Invalid clue <${clue}> passed in to addClue`);
  }
  players[playerHoldingClue].heldClues.push(clue);
  // @ts-ignore
  knownClues[clueCategory].push(clue);
  analyze(knownClues, players, debug);
};

export const analyze = (
  knownClues: KnownClues,
  players: PlayerTracker,
  debug: boolean = false
) => {
  let foundClue = false;
  if (debug) {
    console.log("DEBUG analyze");
    console.log(knownClues);
    console.log(JSON.stringify(players));
  }
  Object.keys(players).forEach(playerName => {
    players[playerName].answered.forEach(answeredSuggestion => {
      // short circuit if we already found a clue since we'll re-run analyze()
      if (!foundClue) {
        const clues = answeredSuggestion.filter(
          clueItem =>
            !knownClues.person.includes(clueItem) &&
            !knownClues.place.includes(clueItem) &&
            !knownClues.weapon.includes(clueItem) &&
            !players[playerName].skipped.includes(clueItem) &&
            !players[playerName].heldClues.includes(clueItem)
        );
        // this means that this was the clue they showed
        if (clues.length === 1) {
          foundClue = true;
          console.log("🚀🚀uncovered clue from:", playerName, ":", clues[0]);
          players[playerName].heldClues.push(clues[0]);
          addClue(knownClues, playerName, clues[0], players, debug);
        }
      }
    });
  });
};

export const addSuggestion = (
  asked: string,
  answered: string,
  items: string[],
  players: PlayerTracker,
  knownClues: KnownClues,
  playerOrder: string[],
  debug: boolean = false
) => {
  players[answered].answered.push(items);
  const passingPlayers = determinePlayersInBetween(
    asked,
    answered,
    playerOrder
  );
  passingPlayers.forEach(player => players[player].skipped.push(...items));
  analyze(knownClues, players, debug);
};
