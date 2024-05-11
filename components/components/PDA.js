import {
    Box,
    VStack,
    Text,
    Image,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
  } from "@chakra-ui/react";
  import lebonbon from "./lebonbon.jpg"

  const PDA = ({ prob2 }) => {
    return (
      <>
        <Popover isLazy placement="top">
          <PopoverTrigger>
            <Button mx="2">Show PDA</Button>
          </PopoverTrigger>
          <PopoverContent
            maxW={["17em", null, "16em", null, null, "16em"]}
            _focus=""
            bg="gray.50"
            fontSize={["0.7em", "0.7em", "0.9em"]}
          >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontWeight="semibold">
              PushDown Automata
            </PopoverHeader>
            <PopoverBody align="center">
              {!prob2 ? (
                <Box minH="100vh">
                    <Image
                        src={lebonbon}
                    />
                </Box>
              ) : (
                <Box minH="100vh">
                    <Image
                        src={lebonbon}
                    />
                </Box>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </>
    );
  };
  
  export default PDA;
  