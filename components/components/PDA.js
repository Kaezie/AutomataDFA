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
                <Image
                    src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2Fthedawg3_%2Fstatus%2F1766659368139776244&psig=AOvVaw2-4SjkQrhnvTug4EwE8wG7&ust=1715499358337000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDqt6CLhYYDFQAAAAAdAAAAABAE"
                />
              ) : (
                <Image
                    src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2Fthedawg3_%2Fstatus%2F1766659368139776244&psig=AOvVaw2-4SjkQrhnvTug4EwE8wG7&ust=1715499358337000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDqt6CLhYYDFQAAAAAdAAAAABAE"
                />
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </>
    );
  };
  
  export default PDA;
  