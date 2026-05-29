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
    this.currentInputPos = 0;
    this.path = [1];

    this.node();
  }

  node() {
    if (this.currentInputPos === this.input.length) {
      if (this.currentNode === this.problem.length) {
        this.result = "Valid";
      } else {
        this.result = "Invalid";
        this.path.push("eos");
      }
      return;
    }

    const currentChar = this.input[this.currentInputPos];

    if (!this.language.includes(currentChar)) {
      this.result = "Invalid";
      this.path.push("eos");
      return;
    }

    const currentNode = this.problem[this.currentNode - 1];

    if (currentNode.direction[this.language.indexOf(currentChar)] === "T") {
      this.result = "Invalid";
      this.path.push("T");
      return;
    }

    this.currentNode = currentNode.direction[this.language.indexOf(currentChar)];
    this.path.push(this.currentNode);

    this.currentInputPos++;

    this.node();
  }
}

export const problem1 = [
  new Node(1,  "T", 2),   // q1:  a→T,   b→q19
  new Node(2,  3,   3),   // q19: a→q24, b→q24
  new Node(3,  "T", 4),   // q24: a→T,   b→q25
  new Node(4,  5,   7),   // q25: a→q26, b→q27
  new Node(5,  5,   6),   // q26: a→q26, b→q28
  new Node(6,  9,   7),   // q28: a→q30, b→q27
  new Node(7,  8,   7),   // q27: a→q29, b→q27
  new Node(8,  8,   10),  // q29: a→q29, b→q20
  new Node(9,  8,   11),  // q30: a→q29, b→q21
  new Node(10, 12,  "T"), // q20: a→q22, b→T
  new Node(11, 13,  27),  // q21: a→q23, b→q4
  new Node(12, 22,  14),  // q22: a→q8,  b→q31
  new Node(13, 22,  15),  // q23: a→q8,  b→q32
  new Node(14, 16,  27),  // q31: a→q2,  b→q4
  new Node(15, 17,  27),  // q32: a→q3,  b→q4
  new Node(16, 22,  18),  // q2:  a→q8,  b→q9
  new Node(17, 22,  19),  // q3:  a→q8,  b→q10
  new Node(18, 20,  25),  // q9:  a→q16, b→q14
  new Node(19, 21,  25),  // q10: a→q17, b→q14
  new Node(20, 22,  10),  // q16: a→q8,  b→q20
  new Node(21, 22,  11),  // q17: a→q8,  b→q21
  new Node(22, "T", 23),  // q8:  a→T,   b→q15
  new Node(23, 24,  "T"), // q15: a→q7,  b→T
  new Node(24, 22,  25),  // q7:  a→q8,  b→q14
  new Node(25, 26,  27),  // q14: a→q18, b→q4
  new Node(26, "T", 24),  // q18: a→T,   b→q7
  new Node(27, 28,  30),  // q4:  a→q11, b→q12
  new Node(28, 28,  29),  // q11: a→q11, b→q5
  new Node(29, 32,  30),  // q5:  a→q13, b→q12
  new Node(30, 31,  30),  // q12: a→q6,  b→q12
  new Node(31, 28,  32),  // q6:  a→q11, b→q13
  new Node(32, 32,  32),  // q13: ACCEPT, a→q13, b→q13
];

export const problem2 = [ //updated
  new Node(1, 2, 1),  // q1: 0→q2, 1→q1
  new Node(2, 3, 4),  // q2: 0→q3, 1→q4
  new Node(3, 4, 4),  // q3: 0→q4, 1→q4
  new Node(4, 5, 6),  // q4: 0→q5, 1→q6
  new Node(5, 9, 9),  // q5: 0→q7, 1→q7
  new Node(6, 7, 8),  // q6: 0→q8, 1→q9
  new Node(7, 9, 9),  // q8: 0→q7, 1→q7
  new Node(8, 7, 9),  // q9: 0→q8, 1→q7
  new Node(9, 9, 9), 
];

export const language1 = ["a", "b"];
export const language2 = ["0", "1"];
