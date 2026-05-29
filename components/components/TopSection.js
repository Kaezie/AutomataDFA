import {
  Flex,
  Input,
  Button,
  Text,
  Heading,
  Box,
  Divider,
  Tag,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Switch,
  FormLabel,
} from "@chakra-ui/react";

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
  multiResults,
  multiString,
  handleMultiChange,
  handleMultiTest,
  isMultiMode,
  toggleMode,
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
            <Heading w="5em">Alphabet:</Heading>
            <Tag my={1} fontSize={["0.7em", "0.7em", "0.9em"]}>
              {!prob2 ? "[a, b]" : "[0, 1]"}
            </Tag>
          </Flex>

          {/* Mode toggle */}
          <Flex align="center" my="3" gap="3">
            <FormLabel mb="0" fontSize="sm" color={!isMultiMode ? "white" : "gray.500"}>Single</FormLabel>
            <Switch
              isChecked={isMultiMode}
              onChange={toggleMode}
              isDisabled={simulating}
            />
            <FormLabel mb="0" fontSize="sm" color={isMultiMode ? "white" : "gray.500"}>Multiple Strings</FormLabel>
          </Flex>

          <form onSubmit={isMultiMode ? handleMultiTest : handleTest}>
            {!isMultiMode ? (
              /* ── SINGLE MODE ── */
              <>
                 <Flex align="center" w="100%">
                  <Heading w="10em">Input String:</Heading>
                  <Input
                    maxLength="500"
                    fontSize={["0.7em", "0.7em", "0.9em"]}
                    my={3}
                    placeholder={!prob2 ? "e.g. babbabab" : "e.g. 0110101"}
                    value={string}
                    onChange={handleTextChange}
                  />
               {data && (
                    <Button
                      ml={2}
                      bg={data.result === "Valid" ? "green.500" : "red.400"}
                      _hover={{}}
                      cursor="default"
                      whiteSpace="nowrap"
                    >
                      {data.result}
                    </Button>
                  )}
                </Flex>

                <Flex justify="space-between" align="center">
                  <Flex align="center">
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
                    <Button
                      onClick={handleReset}
                      ml={2}
                      disabled={simulating}
                    >
                      Clear All
                    </Button>
                  </Flex>
                </Flex>
              </>
            ) : (
              /* ── MULTI MODE ── */
              <>
                <Flex align="flex-start">
                  <Heading w="10em" mt={2}>Input Strings:</Heading>
                  <Textarea
                    fontSize={["0.7em", "0.7em", "0.9em"]}
                    my={3}
                    placeholder={
                      !prob2
                        ? "Enter one string per line\ne.g.\nbabbabab\nabba\nbab"
                        : "Enter one string per line\ne.g.\n0110101\n000\n101"
                    }
                    value={multiString}
                    onChange={handleMultiChange}
                    rows={5}
                    resize="vertical"
                  />
                </Flex>

                <Flex mb={3}>
                  <Button type="submit" disabled={simulating}>
                    Compile All
                  </Button>
                  <Button
                    onClick={handleReset}
                    ml={2}
                    disabled={simulating}
                  >
                    Clear All
                  </Button>
                </Flex>

                {/* Results table */}
                {multiResults && multiResults.length > 0 && (
                  <Box
                    maxH="200px"
                    overflowY="auto"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    mb={3}
                  >
                    <Table size="sm" variant="simple">
                      <Thead position="sticky" top={0} zIndex={1} bg="#403272">
                        <Tr>
                          <Th color="#f0e4ff">#</Th>
                          <Th color="#f0e4ff">String</Th>
                          <Th color="#f0e4ff">Result</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {multiResults.map((r, i) => (
                          <Tr key={i}>
                            <Td color="#f0e4ff" fontSize="xs">{i + 1}</Td>
                            <Td>
                              <Text
                                fontFamily="mono"
                                fontSize="xs"
                                color="white"
                              >
                                {r.string === "" ? '""' : r.string}
                              </Text>
                            </Td>
                            <Td>
                              <Button
                                size="sm"
                                bg={r.result === "Valid" ? "green.500" : "red.400"}
                                _hover={{}}
                                cursor="default"
                              >
                                {r.result}
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                )}
              </>
            )}

            <Divider my="6" />
          </form>
        </Box>
      </Box>
    </>
  );
};

export default LeftBox;
