const datamuse = require("datamuse");

const numPlayers = 2;
const query = process.argv[2];
datamuse.request(`words?sp=${query}*`).then(json => {
  console.log(json);

  const wordList = json.map(obj => {
    const { word } = obj;
    return word;
  });

  const badWords = wordList.filter(word => {
    if (
      word.length === query.length + numPlayers + 1 ||
      word.length === query.length + 1 + 2 * numPlayers
    ) {
      console.log("bad word", word);
      return true;
    }
  });

  console.log(badWords);

  const badLetters = [];
  badWords.map(word => {
    badLetters.push(word[query.length]);
  });

  const lettersSet = new Set(badLetters);
  console.log(lettersSet);

  const safeWords = wordList
    .filter(word => {
      return !lettersSet.has(word[query.length]);
    })
    .filter(word => {
      return word.length !== query.length + 1 && word.length !== query.length;
    });

  console.log(safeWords);

  // find a letter for which there are no words that end in
  // query.length + numPlayers or query.length + numPlayers * 2
  //
});
