import { Flex, Button, Heading, Tag,  Divider, Text, Select } from "@chakra-ui/react";

import FirstDFA from "../DFA/FirstDFA";
import SecondDFA from "../DFA/SecondDFA";
import CFG from "./CFG";
import PDA from "./PDA";

const RightBox = ({
  prob2,
  simulating,
  regex1,
  regex2,
  currentNode,
  handleSwitch,
}) => {
  return (
    <>
      <Flex
         direction="column"
        mb={[14, 14, 16, 16, 16, 0]}
        w={["20em", null, "40em", null, null, "60em"]}
      >
        <Flex
          align="center"
          mb="1"
          direction="row"
        >
          <Heading w="10em">
            Regular Expression:
          </Heading>
          <Select
            isDisabled={simulating}
            onChange={(e) => {
              if ((e.target.value === "2") !== prob2) handleSwitch();
            }}
            value={!prob2 ? "1" : "2"}
            size="sm"
            w="auto"
            borderRadius="md"
          >
            <option value="1">{regex1}</option>
            <option value="2">{regex2}</option>
          </Select>
        </Flex>
        <Flex mb="4" gap="1" mt="4">
          <CFG prob2={prob2} />
          <PDA prob2={prob2} />
        </Flex>
        <Flex
          h={["12em", null, "18em", null, null, "22em"]}
          pos="relative"
        >
          {!prob2 ? (
            <FirstDFA currentNode={currentNode} simulating={simulating} />
          ) : (
            <SecondDFA
              currentNodeVal={currentNode}
              simulatingStatus={simulating}
            />
          )}
        </Flex>
        <Divider my="3" w="100" />
        <Text
        color="#645e6b"
        align="center">
        BCS35 | Abas • Alipit • Balagao • Francisco
        </Text>
      </Flex>
    </>
  );
};

export default RightBox;
