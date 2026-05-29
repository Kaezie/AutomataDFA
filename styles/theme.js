import { extendTheme } from "@chakra-ui/react";
import { Button, Heading, Tag, Flex, Input, Text } from "./overrides";
import { Badge } from "./badgeStyles";
import '@fontsource/montserrat';
import '@fontsource/roboto';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#212124"
      },
      p: {
        color: "white.700",
      },
      "h1, h2, h3, h4": {
        color: "white.700",
      },
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts:{
    body:`'Arial', sans-serif`,
    heading:`'Calibri', sans-serif`,
  },
  textStyles: {
    Primary: {
      color: "white.300",
    },
  },
  layerStyles: {
    Primary: {
      bgColor: "white.300",
    },
  },
  components: {
    Button,
    Badge,
    Heading,
    Tag,
    Flex,
    Input,
    Text,
  },
});
