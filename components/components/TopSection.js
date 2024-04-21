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
        w={["40em", "40em", "40em", "40em", "40em", "52em"]}
        mr={[0, 0, 0, 0, 0, 24]}
      >
        <Flex align="Aflex-end" justify="space-between">
          <Heading variant="title">Group 4</Heading>
        </Flex>

        <Divider mb="6" />

        <Box>
          <form onSubmit={handleTest}>
            <Flex 
              align="center"
              >
              <Heading>Input String:</Heading>
              <Input
                maxLength="500"
                fontSize={["0.7em", "0.7em", "0.9em"]}
                my={3}
                placeholder={!prob2 ? "e.g. babbabab" : "e.g. 0110101"}
                value={string}
                onChange={handleTextChange}
              />
              <Flex align="center">
                {data && (
                  <Button
                    variant="data"
                    rightIcon={
                      data.result == "Valid" ? (
                        <Box color="teal.300">
                          <FaCheck />
                        </Box>
                      ) : (
                        data.result == "Invalid" && (
                          <Box color="pink.300">
                            <ImCross />
                          </Box>
                        )
                      )
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
                  Compile
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
              </Flex>
            </Flex>
            <Divider my="6" />
            <Flex
              align="center"
              direction={["row", "row", "row", "row", "row", "row"]}
              display={["flex", "flex", "flex", "flex", "flex", "flex"]}
              // justify="space-between"
            >
              <Heading>Regular Expression:</Heading>
              <Tag my={1} fontSize={["0.7em", "0.7em", "0.9em"]}>
                {!prob2 ? regex1 : regex2}
              </Tag>
            </Flex>
            <Flex
              direction={["row", "row", "row", "row", "row", "row"]}
              display={["flex", "flex", "flex", "flex", "flex", "flex"]}
              align="center"
            >
              <Heading>Language Accepted:</Heading>
              <Tag my={1} fontSize={["0.7em", "0.7em", "0.9em"]}>
                {!prob2 ? "[a, b]" : "[0, 1]"}
              </Tag>
            </Flex>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default LeftBox;
