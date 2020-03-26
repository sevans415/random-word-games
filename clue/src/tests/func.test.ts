import { gameEngine } from "../interface";

const playerOrder = ["spencer", "bryn", "dad", "mom", "nada"];

describe("analyze", () => {
  // Use 2 clues to determine clue
  it("scenario 1", () => {
    const game = gameEngine(playerOrder);
    game.addClue("dining", "spencer");
    game.addClue("plum", "spencer");
    game.addSuggestion("mom", "nada", ["plum", "dining", "pipe"]);

    expect(game.knownClues).toEqual({
      person: ["plum"],
      place: ["dining"],
      weapon: ["pipe"]
    });
  });

  // Uses skip logic to determine clue
  it("scenario 2", () => {
    const game = gameEngine(playerOrder);
    // skips mom, mustard is the only one that they could have
    game.addSuggestion("bryn", "nada", ["plum", "dining", "pipe"]);
    game.addSuggestion("bryn", "mom", ["mustard", "dining", "pipe"]);

    expect(game.knownClues).toEqual({
      person: ["mustard"],
      place: [],
      weapon: []
    });
  });

  // Uses skip logic and a known clue to determine clue
  it("scenario 2", () => {
    const game = gameEngine(playerOrder);
    game.addClue("pipe", "spencer");
    // skips mom, so she couldnt have clued dining -- assumes pipe clue didn't come from her
    game.addSuggestion("bryn", "nada", ["plum", "dining", "knife"]);
    game.addSuggestion("bryn", "mom", ["mustard", "dining", "pipe"]);

    expect(game.knownClues).toEqual({
      person: ["mustard"],
      place: [],
      weapon: ["pipe"]
    });
  });

  // recursive analysis
  it("scenario 3", () => {
    const game = gameEngine(playerOrder);
    game.addClue("pipe", "spencer");
    game.addClue("dining", "spencer");

    // 1. no clues at the time
    // 2. 1 clue at the time, shares 1 clue with 1)
    // 3. 2 clues at the time, shares 1 clue with 2) (not same as 1.)

    // 2. when plum and lounge come we figure out wrench
    game.addSuggestion("bryn", "dad", ["plum", "lounge", "wrench"]);
    // 2. when plum comes, we figure out lounge
    game.addSuggestion("bryn", "dad", ["plum", "lounge", "pipe"]);
    // 1. figures out plum
    game.addSuggestion("bryn", "dad", ["plum", "dining", "pipe"]);

    expect(game.knownClues).toEqual({
      person: ["plum"],
      place: ["dining", "lounge"],
      weapon: ["pipe", "wrench"]
    });
  });

  // recursive analysis w/ skip logic included
  it("scenario 4", () => {
    const game = gameEngine(playerOrder);
    game.addClue("pipe", "spencer");
    game.addClue("dining", "spencer");

    // dad passes on lounge
    game.addSuggestion("bryn", "mom", ["mustard", "lounge", "rope"]);
    // 2. when plum lands, we can also eliminate lounge, so we determine wrench
    game.addSuggestion("bryn", "dad", ["plum", "lounge", "wrench"]);
    // 1. figures out plum
    game.addSuggestion("bryn", "dad", ["plum", "dining", "pipe"]);

    expect(game.knownClues).toEqual({
      person: ["plum"],
      place: ["dining"],
      weapon: ["pipe", "wrench"]
    });
  });
});
