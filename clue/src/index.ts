import { gameEngine } from "./interface";

const playerOrder = ["spencer", "bryn", "dad", "mom", "nada"];

const game = gameEngine(playerOrder);
game.addClue("pipe", "spencer");
game.addClue("dining", "spencer");

// dad passes on lounge
game.addSuggestion("bryn", "mom", ["mustard", "lounge", "rope"]);
// 2. when plum lands, we can also eliminate lounge, so we determine wrench
game.addSuggestion("bryn", "dad", ["plum", "lounge", "wrench"]);
// 1. figures out plum
game.addSuggestion("bryn", "dad", ["plum", "dining", "pipe"]);

game.printClues();
