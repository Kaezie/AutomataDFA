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
  Portal,
} from "@chakra-ui/react";

const PDA = ({ prob2 }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} mx="2">
        Show PDA
      </Button>
      {isOpen && (
        <Portal>
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex="popover"
            bg="rgba(0, 0, 0, 0.5)" // Optional: Add a background overlay
            onClick={onClose} // Close when clicking outside the popover content
          >
            <Popover isOpen={isOpen} onClose={onClose} closeOnBlur={false}>
              <PopoverContent
                _focus=""
                bg="gray.800"
                fontSize={["0.7em", "0.7em", "0.9em"]}
                width="80%" // Adjust width as needed
                maxW="500px" // Adjust max width as needed
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popover content
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
          </Box>
        </Portal>
      )}
    </>
  );
};

export default PDA;
