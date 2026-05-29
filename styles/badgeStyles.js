export const Badge = {
  baseStyle: {
    _focus: "",
  },
  sizes: {
    node: {
      bg: "gray.700",
      color: ["gray.200", null, "gray.200"],

      // h: ["2em", "2em", "3.5em", "3.5em"],
      h: "3.5em",
      w: "3.5em",
      // w: ["2em", "2em", "3.5em", "3.5em"],

      boxShadow: "xl",
      border: "2px",
      rounded: "50%",

      pos: "absolute",
      transform: "auto",
      translateX: "-50%",
      translateY: "-50%",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      textTransform: "none",
      fontSize: ["0.6em", "0.6em", "1em", "1em", "1em", "1.1em"],
      fontWeight: "500",
    },
  },
  variants: {
    q1: {
      top: "50%",
      left: "10%",

      borderColor: "green.300",
    },
    q2: {
      top: "20%",
      left: "20%",

      borderColor: "blue.300",
    },
    q3: {
      top: "20%",
      left: "40%",

      borderColor: "blue.300",
    },
    q4: {
      top: "80%",
      left: "20%",

      borderColor: "blue.300",
    },
    q5: {
      top: "80%",
      left: "40%",

      borderColor: "blue.300",
    },
    q6: {
      top: "50%",
      left: "50%",

      borderColor: "blue.300",
    },
    q7: {
      top: "20%",
      left: "60%",

      borderColor: "blue.300",
    },
    q8: {
      top: "80%",
      left: "60%",

      borderColor: "blue.300",
    },
    q9: {
      top: "50%",
      left: "70%",

      borderColor: "blue.300",
    },
    q10: {
      top: "50%",
      left: "90%",

      borderColor: "green.300",
    },
    q10inner: {
      top: "50%",
      left: "50%",
      h: "2.25em",
      w: "2.25em",
      borderColor: "green.300",
    },
    T: {
      top: "50%",
      left: "30%",

      borderColor: "red.300",
    },
    1: {
      top: "15%",
      left: "70%",

      borderColor: "blue.300",
    },
    2: {
      top: "50%",
      left: "70%",

      borderColor: "blue.300",
    },
    3: {
      top: "85%",
      left: "70%",

      borderColor: "blue.300",
    },
    4: {
      top: "50%",
      left: "50%",

      borderColor: "blue.300",
    },
    5: {
      top: "50%",
      left: "90%",

      borderColor: "green.300",
    },
    inner5: {
      top: "50%",
      left: "50%",
      h: "2.25em",
      w: "2.25em",
      borderColor: "green.300",
    },
    6: {
      top: "85%",
      left: "50%",

      borderColor: "blue.300",
    },
    7: {
      top: "50%",
      left: "30%",

      borderColor: "blue.300",
    },
    8: {
      top: "50%",
      left: "10%",

      borderColor: "green.300",
    },

    // ── Problem 2 states ──
    // q1(start): left side
    q1_2: {
      top: "50%",
      left: "5%",
      borderColor: "green.300",
    },
    // q2
    q2_2: {
      top: "50%",
      left: "22%",
      borderColor: "blue.300",
    },
    // q3 (below q2)
    q3_2: {
      top: "75%",
      left: "32%",
      borderColor: "blue.300",
    },
    // q4
    q4_2: {
      top: "50%",
      left: "40%",
      borderColor: "blue.300",
    },
    // q5 (upper branch)
    q5_2: {
      top: "20%",
      left: "55%",
      borderColor: "blue.300",
    },
    // q6 (lower branch)
    q6_2: {
      top: "80%",
      left: "55%",
      borderColor: "blue.300",
    },
    // q8 (upper-right)
    q8_2: {
      top: "30%",
      left: "72%",
      borderColor: "blue.300",
    },
    // q9 (lower-right)
    q9_2: {
      top: "70%",
      left: "72%",
      borderColor: "blue.300",
    },
    // q7 accept state
    q7_2: {
      top: "50%",
      left: "88%",
      borderColor: "green.300",
    },
    q7_2inner: {
      top: "50%",
      left: "50%",
      h: "2.25em",
      w: "2.25em",
      borderColor: "green.300",
    },
    // Trap state for problem 2
    T_2: {
      top: "5%",
      left: "60%",
      borderColor: "red.300",
    },
  },
  defaultProps: {
    size: "node",
  },
};
