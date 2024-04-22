export class Node {
  constructor(nodeNumber, direction1, direction2) {
    this.nodeNumber = nodeNumber;
    this.direction = [direction1, direction2];
  }
}

export class DFA {
  constructor(input, problem, language) {
    this.input = input;
    this.problem = problem;
    this.language = language;

    this.currentNode = 1;
    this.currentInputPos = 0; // Start at position 0
    this.path = [1];

    this.node();
  }

  node() {
    if (this.currentInputPos === this.input.length) {
      // If input string has been fully processed
      if (this.currentNode === this.problem.length) {
        this.result = "Valid";
      } else {
        this.result = "Invalid"; // Input is too short
        this.path.push("eos");
      }
      return; // End processing
    }

    const currentChar = this.input[this.currentInputPos];

    if (!this.language.includes(currentChar)) {
      // If current character is not in the language
      this.result = "Invalid";
      this.path.push("eos");
      return; // End processing
    }

    const currentNode = this.problem[this.currentNode - 1];

    if (currentNode.direction[this.language.indexOf(currentChar)] === "T") {
      // If the direction leads to a trap state
      this.result = "Invalid";
      this.path.push("T");
      return; // End processing
    }

    this.currentNode = currentNode.direction[this.language.indexOf(currentChar)];
    this.path.push(this.currentNode);

    // Move to the next character in the input string
    this.currentInputPos++;

    // Continue processing
    this.node();
  }
}

// Test data
export const problem1 = [
  new Node(1, 2, 4),
  new Node(2, "T", 3),
  new Node(3, 6, "T"),
  new Node(4, 5, "T"),
  new Node(5, "T", 6),
  new Node(6, 6, 7),
  new Node(7, 8, 7),
  new Node(8, 6, 9),
  new Node(9, 10, 10),
  new Node(10, 10, 10),
];

export const problem2 = [
  new Node(1, 2, 2),
  new Node(2, 4, 3),
  new Node(3, 7, 5),
  new Node(4, 6, 3),
  new Node(5, 7, 8),
  new Node(6, 8, 3),
  new Node(7, 6, 8),
  new Node(8, 8, 8),
];

export const language1 = ["a", "b"];
export const language2 = ["0", "1"];
