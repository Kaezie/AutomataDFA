import { Flex, useToast, Divider } from "@chakra-ui/react";
import { useState } from "react";

import { DFA, problem1, problem2, language1, language2 } from "./DFA/Logic";
import TopSection from "./components/TopSection";
import BottomSection from "./components/BottomSection";

const Main = () => {
  const regex1 = "(aba+bab)(a+b)*(bab)(a+b)*(a+b+a+ab+ba)(a+b+aa)*";
  const regex2 = "((101+111+101)+(1+0+11)) (1+0+01)* (111+000+101) (1+0)*";

  const [string, setString] = useState("");
  const [data, setData] = useState("");
  const [count, setCount] = useState(0);

  const [prob2, setProb2] = useState(false);
  const [currentNode, setCurrentNode] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [simulationCompleted, setSimulationCompleted] = useState(false);

  const validString = useToast();
  const trapString = useToast();
  const shortString = useToast();
  const notInLanguageString = useToast();
  const closeToasts = useToast();

  let input = string;
  let results = "";

  const handleTextChange = (e) => {
    const stringValue = e.target.value;
    setString(stringValue);
    const countValue = e.target.value.length;
    setCount(countValue);
  };
  const handleReset = () => {
    setString("");
    setCount(0);
    setData("");
    closeAll();
  };
  const handleSwitch = () => {
    setProb2((prev) => !prev);
    setData("");
    closeAll();
  };

  const closeAll = () => {
    closeToasts.closeAll();
  };
  const validToast = () => {
    validString({
      title: "Valid String!",
      status: "success",
      isClosable: true,
    });
  };
  const trapToast = () => {
    trapString({
      title: "Invalid: Trapped",
      status: "error",
      isClosable: true,
    });
  };
  const shortToast = () => {
    shortString({
      title: "Invalid: Too Short",
      status: "error",
      isClosable: true,
    });
  };
  const notInLanguageToast = () => {
    notInLanguageString({
      title: "Empty/Invalid Input",
      status: "warning",
      isClosable: true,
    });
  };

  const handleValid = () => {
    // console.log("DONE OK");
    setSimulating(false);
    validToast();
    setData(results);
    setSimulationCompleted(true);
  };
  const handleTrapped = () => {
    // console.log("DONE TRAPPED");
    setSimulating(false);
    trapToast();
    setData(results);
    setSimulationCompleted(true);
  };
  const handleShort = () => {
    // console.log("DONE SHORT");
    setSimulating(false);
    shortToast();
    setData(results);
    setSimulationCompleted(true);
  };

  const handleInputString = () => {
    input = input.replace(/\s+/g, "").toLowerCase();
  };

  const handleTest = (e) => {
    e.preventDefault();
    handleInputString();

    if (!prob2) {
      if (input == "") {
        notInLanguageToast();
        // console.log("No valid configuration for input string/empty");
      } else if (input.includes("a") || input.includes("b")) {
        // console.log("PROB1");
        results = new DFA(input, problem1, language1);
        // console.log(results);
        setData(results);
      } else {
        notInLanguageToast();
        // console.log("No valid configuration for input string!!");
      }
    } else {
      if (input == "") {
        notInLanguageToast();
        // console.log("No valid configuration for input string/empty");
      } else if (input.includes("0") || input.includes("1")) {
        // console.log("PROB2");
        results = new DFA(input, problem2, language2);
        // console.log(results);
        setData(results);
      } else {
        notInLanguageToast();
        // console.log("No valid configuration for input string!!");
      }
    }
    setSimulationCompleted(false);
  };

  const handleSimulation = (e) => {
    e.preventDefault();
    handleInputString();
  
    if (!prob2) {
      if (input == "") {
        notInLanguageToast();
      } else if (input.includes("a") || input.includes("b")) {
        setSimulating(true);
        results = new DFA(input, problem1, language1);
        const pathWithZeroes = [0].concat(...results.path.map((e) => [e, 0]));
        let isValid = false; // Track if a valid path has been found
        pathWithZeroes.forEach((node, i) => {
          setTimeout(() => {
            setCurrentNode(node);
            if (!isValid && node === pathWithZeroes[pathWithZeroes.length - 2] && !pathWithZeroes.includes("T") && !pathWithZeroes.includes("eos")) {
              handleValid();
              isValid = true;
            } else if (node === "T" && pathWithZeroes.slice(-4)[0] === "T") {
              handleTrapped();
            } else if (pathWithZeroes.slice(-4)[3 - 1] === node && !pathWithZeroes.includes("T")) {
              handleShort();
            }
          }, i * 200);
        });
      } else {
        notInLanguageToast();
      }
    } else {
      if (input == "") {
        notInLanguageToast();
      } else if (input.includes("0") || input.includes("1")) {
        setSimulating(true);
        results = new DFA(input, problem2, language2);
        const pathWithZeroes = [0].concat(...results.path.map((e) => [e, 0]));
        let isValid = false; // Track if a valid path has been found
        pathWithZeroes.forEach((node, i) => {
          setTimeout(() => {
            setCurrentNode(node);
            if (!isValid && node === pathWithZeroes[pathWithZeroes.length - 2] && !pathWithZeroes.includes("eos")) {
              handleValid();
              isValid = true;
            } else if (pathWithZeroes.slice(-4)[3 - 1] === node) {
              handleShort();
            }
          }, i * 200);
        });
      } else {
        notInLanguageToast();
      }
    }
  };

  return (
    <Flex
      direction={["column"]}
      align="center"
    >
      <TopSection
        handleTest={handleTest}
        data={data}
        prob2={prob2}
        string={string}
        handleTextChange={handleTextChange}
        simulating={simulating}
        handleSimulation={handleSimulation}
        handleReset={handleReset}
        count={count}
        regex1={regex1}
        regex2={regex2}
      />
      <BottomSection
        prob2={prob2}
        simulating={simulating}
        regex1={regex1}
        regex2={regex2}
        currentNode={currentNode}
        handleSwitch={handleSwitch}
      />
      <Divider
        display={["block", null, "block", null, null, "none"]}
        mt="6"
        mb="2"
      />
      
    </Flex>
  );
};

export default Main;
