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
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="popover"
          bg="rgba(0, 0, 0, 0.5)" // Optional: Add a background overlay
          onClick={onClose} // Close when clicking outside the popover content
        >
          <Popover isOpen={isOpen} onClose={onClose} placement="center">
            <PopoverContent
              _focus=""
              bg="gray.800"
              fontSize={["0.7em", "0.7em", "0.9em"]}
              width="70%" // Adjust width as needed
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popover content
            >
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontWeight="semibold">Push Down Automata</PopoverHeader>
              <PopoverBody align="center">
                {!prob2 ? (
                  <Image src="/PDA_AB.png" />
                ) : (
                  <Image src="/PDA_01.png" />
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      )}
    </>
  );
};

export default PDA;
