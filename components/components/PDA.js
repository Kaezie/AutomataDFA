import React from "react";
import {
  Box,
  Image,
  Button,
  Popover,
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
      {isOpen && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="popover"
          bg="rgba(0, 0, 0, 0.5)" // Optional: Add a background overlay
          onClick={onClose} // Close when clicking outside the popover content
        >
          <Box
            position="relative"
            bg="gray.800"
            borderRadius="md"
            p={4}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popover content
          >
            <Popover isOpen={isOpen} onClose={onClose} placement="center">
              <PopoverContent
                position="relative"
                bg="gray.800"
                fontSize={["0.7em", "0.7em", "0.9em"]}
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
        </Box>
      )}
    </>
  );
};

export default PDA;
