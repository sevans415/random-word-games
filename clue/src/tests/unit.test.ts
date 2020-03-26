import {
  determinePlayersInBetween,
  generateKnownClues,
  generatePlayerTracker
} from "../helpers";
import { addClue, addSuggestion, analyze } from "../coreFunctions";

const playerOrder = ["spencer", "bryn", "dad", "mom", "nada"];

test("determinePlayersInBetween", () => {
  const order1 = determinePlayersInBetween("spencer", "bryn", playerOrder);
  const order2 = determinePlayersInBetween("spencer", "mom", playerOrder);
  const order3 = determinePlayersInBetween("nada", "spencer", playerOrder);
  const order4 = determinePlayersInBetween("nada", "mom", playerOrder);
  const order5 = determinePlayersInBetween("dad", "bryn", playerOrder);

  expect(order1).toEqual([]);
  expect(order2).toEqual(["bryn", "dad"]);
  expect(order3).toEqual([]);
  expect(order4).toEqual(["spencer", "bryn", "dad"]);
  expect(order5).toEqual(["mom", "nada", "spencer"]);
});

test("addClue", () => {
  const knownClues = generateKnownClues();
  const players = generatePlayerTracker(playerOrder);
  addClue(knownClues, "spencer", "knife", players);
  addClue(knownClues, "spencer", "plum", players);
  addClue(knownClues, "spencer", "hall", players);
  addClue(knownClues, "spencer", "billiard", players);
  expect(knownClues).toEqual({
    person: ["plum"],
    place: ["hall", "billiard"],
    weapon: ["knife"]
  });
});

describe("addSuggestion", () => {
  it("adds suggestions", () => {
    const knownClues = generateKnownClues();
    const players = generatePlayerTracker(playerOrder);
    addSuggestion(
      "spencer",
      "bryn",
      ["knife", "plum", "hall"],
      players,
      knownClues,
      playerOrder
    );
    addSuggestion(
      "bryn",
      "dad",
      ["candlestick", "peacock", "ballroom"],
      players,
      knownClues,
      playerOrder
    );
    addSuggestion(
      "spencer",
      "bryn",
      ["candlestick", "peacock", "ballroom"],
      players,
      knownClues,
      playerOrder
    );
    expect(players).toEqual({
      spencer: { answered: [], skipped: [], heldClues: [] },
      bryn: {
        answered: [
          ["knife", "plum", "hall"],
          ["candlestick", "peacock", "ballroom"]
        ],
        skipped: [],
        heldClues: []
      },
      dad: {
        answered: [["candlestick", "peacock", "ballroom"]],
        skipped: [],
        heldClues: []
      },
      mom: { answered: [], skipped: [], heldClues: [] },
      nada: { answered: [], skipped: [], heldClues: [] }
    });
  });

  it("adds skips", () => {
    const knownClues = generateKnownClues();
    const players = generatePlayerTracker(playerOrder);
    addSuggestion(
      "spencer",
      "mom",
      ["knife", "plum", "hall"],
      players,
      knownClues,
      playerOrder
    );
    expect(players).toEqual({
      spencer: { answered: [], skipped: [], heldClues: [] },
      bryn: {
        answered: [],
        skipped: ["knife", "plum", "hall"],
        heldClues: []
      },
      dad: {
        answered: [],
        skipped: ["knife", "plum", "hall"],
        heldClues: []
      },
      mom: {
        answered: [["knife", "plum", "hall"]],
        skipped: [],
        heldClues: []
      },
      nada: { answered: [], skipped: [], heldClues: [] }
    });
  });
});
