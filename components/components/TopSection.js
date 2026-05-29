import {
  Flex,
  Input,
  Button,
  Text,
  Heading,
  Box,
  Divider,
  Tag,
  Code,
} from "@chakra-ui/react";

import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const LeftBox = ({
  handleTest,
  data,
  prob2,
  string,
  handleReset,
  handleTextChange,
  handleSimulation,
  simulating,
  count,
  regex1,
  regex2,
}) => {
  return (
    <>
      <Box
        w={["20em", "20em", "40em", "40em", "40em", "54em"]}
        mr={[0, 0, 0, 0, 0, 24]}
      >
        <Flex align="Aflex-end" justify="space-between">
          <Heading variant="title">Group 1: DFA Simulator</Heading>
        </Flex>

        <Divider mb="5" w="115%" />

        <Box>
            <Flex>
              <Heading
                w={["4em", "4em", "4em", "4em", "5em", "5em"]}>
                  Alphabet:
              </Heading>
              <Tag
                my={1} 
                fontSize={["0.7em", "0.7em", "0.9em"]}>
                {!prob2 ? "[a, b]" : "[0, 1]"}
              </Tag>
            </Flex>
            <form onSubmit={handleTest}>
            <Flex 
              align="center"
              >
              <Heading
                w={["4em", "4em", "4em", "4em", "4em", "7em"]}>
                Input String:
              </Heading>
              <Input
                maxLength="500"
                fontSize={["0.7em", "0.7em", "0.9em"]}
                my={4}
                placeholder={!prob2 ? "e.g. babababbbab" : "e.g. 01101"}
                value={string}
                onChange={handleTextChange}
              />
              <Flex align="center">
                {data && (
                  <Button
                    variant="data"
                    bg={
                      data.result == "Valid" ?'green.500': 
                      data.result == "Invalid" && 'red.500'
                    }
                  >
                    {data.result}
                  </Button>
                )}
              </Flex>
            </Flex>
            
            <Flex justify="space-between" align="center">
              <Flex>
                <Button type="submit" disabled={simulating}>
                  Validate
                </Button>
                <Button
                  isLoading={simulating}
                  loadingText="Simulating..."
                  spinnerPlacement="start"
                  onClick={handleSimulation}
                  ml={2}
                  disabled={simulating}
                >
                  Simulate
                </Button>
                <Button onClick={handleReset}
                ml={2}
                >
                  Clear All
                </Button>
              </Flex>
            </Flex>
            <Divider my="5" w="115%" />
          </form>
        </Box>
      </Box>
    </>
  );
};

export default LeftBox;
