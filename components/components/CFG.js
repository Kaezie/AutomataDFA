import {
  Box,
  VStack,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

const CFG = ({ prob2 }) => {
  return (
    <>
      <Popover isLazy placement="top">
        <PopoverTrigger>
          <Button mx="2">Show CFG</Button>
        </PopoverTrigger>
        <PopoverContent
          maxW={["17em", null, "16em", null, null, "16em"]}
          _focus=""
          bg="gray.800"
          fontSize={["0.7em", "0.7em", "0.9em"]}
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="semibold">
            Context-free Grammar
          </PopoverHeader>
          <PopoverBody align="center">
            {!prob2 ? (
              <VStack>
                <Text>{"S -> A B C D E aba F bb G H G"}</Text>
                <Text>{"A -> bab | bbb"}</Text>
                <Text>{"B -> aB | Λ"}</Text>
                <Text>{"C -> bC | Λ"}</Text>
                <Text>{"D -> B | C"}</Text>
                <Text>{"E -> baE | Λ"}</Text>
                <Text>{"F -> babF | abaF | Λ"}</Text>
                <Text>{"G -> bab | aba"}</Text>
                <Text>{"H -> aH | bH | Λ"}</Text>
              </VStack>
            ) : (
              <VStack> 
                <Text>{"S -> A B C D E F"}</Text>
                <Text>{"A -> 1A | 0A | Λ"}</Text>
                <Text>{"B -> 1B | Λ"}</Text>
                <Text>{"C - 0C | Λ"}</Text>
                <Text>{"D -> 101A | 01A | 000A"}</Text>
                <Text>{"E -> 101E | 00E | Λ"}</Text>
                <Text>{"F -> 111A | 00A | 101A"}</Text>
              </VStack>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CFG;
