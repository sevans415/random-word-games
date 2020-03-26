import { generateKnownClues, generatePlayerTracker } from "./helpers";
import { addClue, addSuggestion } from "./coreFunctions";
import { ALL_CLUES } from "./constants";

export const gameEngine = (playerOrder: string[]) => {
  const knownClues = generateKnownClues();
  const playerTracker = generatePlayerTracker(playerOrder);

  return {
    addSuggestion: (asked: string, answered: string, items: string[]) => {
      addSuggestion(
        asked,
        answered,
        items,
        playerTracker,
        knownClues,
        playerOrder
      );
    },
    addClue: (clue: string, playerHoldingClue: string) => {
      addClue(knownClues, playerHoldingClue, clue, playerTracker);
    },
    printClues: () => {
      console.log("\n\n");
      console.log("🤓 Known Clues 🤓");
      console.log("People:", knownClues.person);
      console.log("Places:", knownClues.place);
      console.log("Weapons:", knownClues.weapon);
      console.log("\n");
      console.log("😒 Remaining suspects 👀");
      console.log(
        "People:",
        ALL_CLUES.person.filter(clue => !knownClues.person.includes(clue))
      );
      console.log(
        "Places:",
        ALL_CLUES.place.filter(clue => !knownClues.place.includes(clue))
      );
      console.log(
        "Weapons:",
        ALL_CLUES.weapon.filter(clue => !knownClues.weapon.includes(clue))
      );
    },
    knownClues,
    playerTracker
  };
};
