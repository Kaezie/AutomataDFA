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

  const PDA = ({ prob2 }) => {
    return (
      <>
        <Popover isLazy placement="top">
          <PopoverTrigger>
            <Button mx="2">Show PDA</Button>
          </PopoverTrigger>
          <PopoverContent
            _focus=""
            bg="gray.800"
            fontSize={["0.7em", "0.7em", "0.9em"]}
          >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontWeight="semibold">
            Push Down Automata
            </PopoverHeader>
            <PopoverBody align="center">
              {!prob2 ? (
                <Image
                  size="720px"
                  src="/PDA_AB.png"
            />
              ) : (
                <Image 
                  size="720px"
                  src="/PDA_01.png"
                />
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </>
    );
  };
  
  export default PDA;
  