var Trie = require("./trie2.js").Trie;
var fs = require("fs");

// instantiate our trie
// var trie = new Trie();

// // // insert few values
// trie.insert("hello");
// trie.insert("helium");

// // check contains method
// console.log(trie.contains("helium")); // true
// console.log(trie.contains("kickass")); // false

// // check find method
// console.log(trie.find("hel")); // [ 'helium', 'hello' ]
// console.log(trie.find("hell")); // [ 'hello' ]

/**
 * [
 *  [a, b, j, e],
 *  [l, e, w, a],
 *  [c, d, o, g],
 *  [o, h, a, n],
 * ]
 *
 * getAdjacents(0, 2) => [(0, 1), (1, 1), (1, 2), (1, 3), (0, 3)]
 */

const generateAdjacents = (y, x) => {
  return [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x + 1],
    [y + 1, x + 1],
    [y + 1, x],
    [y + 1, x - 1],
    [y, x - 1]
  ];
};

const Board = props => {
  const { boardConfig } = props;
  const y_length = boardConfig.length;
  const x_length = boardConfig[0].length;

  return {
    getAdjacents: (y, x) => {
      const generated = generateAdjacents(y, x);
      return generated.filter(coords => {
        const y = coords[0];
        const x = coords[1];
        return y >= 0 && y < y_length && x >= 0 && x < x_length;
      });
    },
    getChar: (y, x) => boardConfig[y][x]
  };
};

const Boggle = props => {
  const { board } = props;
  // get all 2/3 letter combos from board

  // fetch all combos and load into Trie

  // explore board

  // separate function to, from a given start, explore the board
  // needs to remember places its already been
  // remember length
};

const seensToWord = (board, seen) => {
  return seen
    .map(nodeStr => {
      const [y, x] = nodeStr.split(",");
      return board.getChar(y, x);
    })
    .join("");
};

// seen = ["0,0", "0,1", "0,2"]

/**
 * takes currNode, explores rest of board that hasn't been seen
 *
 * returns an array with it's [seen] -> string, so result = [string]
 *
 */
const exploreBoard = (board, currNode, seen, trie) => {
  // add currNode to seen,
  seen.push(currNode.toString());
  // console.log("local seen", seen);
  // console.log("trie", trie);
  if (!trie.isPrefix(seensToWord(board, seen))) {
    // console.log("short-circuiting at :", seensToWord(board, seen));
    return [];
  }

  // console.log("continuing with ", seensToWord(board, seen));

  // find adjacents, filter on seen,
  const unexploredAdjNodes = board
    .getAdjacents(...currNode)
    .filter(adjNode => !seen.includes(adjNode.toString()));

  // console.log("currNode ", currNode);
  // console.log("unexploredAdjNodes", unexploredAdjNodes);

  // can inject logic for checking word here,

  // get recursive adjNodes + flatMap it
  const recursivePaths = unexploredAdjNodes
    .map(node => exploreBoard(board, node, seen.slice(0), trie))
    .reduce((acc, val) => acc.concat(val), []);

  // console.log("recursivePaths", recursivePaths, "at currNode ", currNode);
  // console.log(
  //   "seen to word:",
  //   seensToWord(board, seen),
  //   "at currNode ",
  //   currNode
  // );

  // console.log("Returning\n\n");

  if (trie.contains(seensToWord(board, seen))) {
    recursivePaths.push(seensToWord(board, seen));
  }
  // return arr with current seen, appended with recursive calls
  return recursivePaths;
};

// const boardConfig = [
//   ["a", "b", "j", "c"],
//   ["l", "e", "w", "k"],
//   ["p", "d", "o", "g"],
//   ["s", "r", "q", "u"]
// ];

const boardConfig = [
  ["v", "b", "g", "t"],
  ["t", "s", "d", "u"],
  ["m", "t", "k", "o"],
  ["g", "u", "r", "t"]
];
const board = Board({ boardConfig });

// create trie
var trie = new Trie();
const words = ["able", "jew", "welp"];

// console.log("result", result);

// // insert few values
fs.readFile("boggle_dict.txt", function(err, f) {
  var array = f.toString().split("\n");
  array.map(word => {
    // console.log("word", word);
    trie.insert(word);
  });
  let unique_words = new Set([]);

  var i;
  for (i = 0; i < boardConfig.length; i++) {
    var j;
    for (j = 0; j < boardConfig[0].length; j++) {
      const result = exploreBoard(board, [i, j], [], trie);
      result.map(word => unique_words.add(word));
    }
  }
  console.log(
    "all words! :",
    [...unique_words].filter(word => word.length >= 3).slice(0, 50),
    "+\n",
    [...unique_words].filter(word => word.length >= 3).slice(50)
  );
});

// trie.insert("hello");
// trie.insert("helium");

// tests
// const result = exploreBoard(board, [0, 0], []);
// const lengths = {};
// result.map(word => {
//   if (lengths[word.length]) {
//     lengths[word.length] += 1;
//     return;
//   }
//   lengths[word.length] = 1;
// });

// tests
// let uniq = new Set(result);
// console.log("result length", result.length, "unique", [...uniq].length);
// result.map(word => {
//   let u = new Set(word);
//   if ([...u].length !== word.length) {
//     console.log("BAD WORD", word);
//   }
// });

/**
 *
 * [
 *  ["a", "b", "j"],
 *  ["l", "e", "w"],
 *  ["c", "d", "o"]
 * ]
 */

/**
 * 3-4: 1
 * 5: 2
 * 6:3
 * 7:5
 * 8:7
 * 9:11
 */
