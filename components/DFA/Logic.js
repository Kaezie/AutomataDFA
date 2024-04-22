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
    this.currentInputPos = -1;
    this.path = [1];

    this.node();
  }
  node() {
    this.currentInputPos += 1;
    if (this.currentInputPos === this.input.length) {
        // All characters in the input string have been read
        if (this.currentNode === this.problem.length) {
            // If the DFA is in the last node, the string is valid
            this.result = "Valid";
        } else {
            // If the DFA is not in the last node, the string is too short
            this.result = "Invalid";
        }
    } else if (this.currentInputPos === "T") {
        // If the current input is "T", the string is invalid
        this.result = "Invalid";
    } else {
        // Process the input character
        if (this.currentNode < this.problem.length &&
            this.input[this.currentInputPos] !== undefined) {
            let node = this.problem[this.currentNode - 1];
            if (this.language.includes(this.input[this.currentInputPos])) {
                this.currentNode = node.direction[this.language.indexOf(this.input[this.currentInputPos])];
                this.currentNode !== undefined && this.path.push(this.currentNode);
            } else {
                // If the input character is not in the language, the string is invalid
                this.currentNode = "T";
            }
        }
    }
    // Continue recursively until all characters in the string are processed
    this.node();  
  } 
}

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
