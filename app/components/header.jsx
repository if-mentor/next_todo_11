import { Box, Flex, Spacer, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";

export const Header = () => {
  return (
    <Flex
      bg={"green.300"}
      w="100%"
      p={2}
      pr="50px"
      pl="50px"
      mb={5}
      alignItems="center"
    >
      <Heading as="h1">
        <Link href={"/"}>TODO</Link>
      </Heading>
      <Spacer />
      <Button
        color={"white"}
        bg={"gray.400"}
        borderRadius={"50px"}
        h="40px"
        width={"100px"}
      >
        LOGOUT
      </Button>
    </Flex>
  );
};
