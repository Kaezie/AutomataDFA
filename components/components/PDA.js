import React from "react";
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
  useDisclosure,
} from "@chakra-ui/react";

const PDA = ({ prob2 }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      <Button onClick={onOpen} mx="2">
        Show PDA
      </Button>
      <Popover
        isOpen={isOpen}
        onClose={onClose}
        placement="top"
        closeOnBlur={false}
      >
        <PopoverContent
          _focus=""
          bg="gray.800"
          fontSize={["0.7em", "0.7em", "0.9em"]}
          width="80%" // Adjust width as needed
          maxW="500px" // Adjust max width as needed
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight="semibold">Push Down Automata</PopoverHeader>
          <PopoverBody align="center">
            {!prob2 ? (
              <Image size="1920px" src="/PDA_AB.png" />
            ) : (
              <Image size="1920px" src="/PDA_01.png" />
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PDA;
