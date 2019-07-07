var exports = (module.exports = {});

class Node {
  constructor(value, children, endOfWord = false) {
    this.value = value;
    this.children = children;
    this.endOfWord = endOfWord;
  }
}

class Trie {
  constructor() {
    this.head = new Node(".", [], false);
  }

  print() {
    while (currNode) {
      console.log(currNode);
    }
  }

  add(word) {
    let currNode = this.head;
    let remainingWord = word;

    let nextNode = currNode.children.find(node => node.value === word[0]);

    while (nextNode) {
      console.log("extending path", remainingWord);
      if (remainingWord === "") {
        nextNode.endOfWord = true;
        return;
      }
      remainingWord = remainingWord.slice(1);
      nextNode = nextNode.children.find(
        node => node.value === remainingWord[0]
      );
    }

    while (remainingWord !== "") {
      // create a new node for it
      console.log("making new node", remainingWord);
      const newNode = new Node(remainingWord[0], [], false);

      // add to currNode children
      currNode.children.push(newNode);

      // make currNode the new node
      currNode = newNode;
      remainingWord = remainingWord.slice(1);
    }
    // mark endOFWord true
    currNode.endOfWord = true;
  }

  search(word) {
    let currNode = this.head;
    let remainingWord = word;

    let nextNode = currNode.children.find(
      node => node.value === remainingWord[0]
    );

    while (nextNode) {
      console.log("searching for", remainingWord);
      if (remainingWord === "") {
        return nextNode.endOfWord;
      }

      remainingWord = remainingWord.slice(1);

      nextNode = currNode.children.find(
        node => node.value === remainingWord[0]
      );
    }
    return false;
  }
}

const trie = new Trie();
trie.add("hello");
trie.add("heljoo");
trie.add("h");

console.log("trie.search('hell')", trie.search("hell"));
console.log("trie.search('hello')", trie.search("hello"));
console.log(trie.head);
