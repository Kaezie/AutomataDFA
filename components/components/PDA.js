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
  import lebonbon from "../imageAssets/lebonbon.jpg"

  const PDA = ({ prob2 }) => {
    return (
      <>
        {!prob2 ? (
                <Image
                    src={lebonbon}
                />
              ) : (
                <Image
                    src={lebonbon}              
                />
              )}
      </>
    );
  };
  
  export default PDA;
  