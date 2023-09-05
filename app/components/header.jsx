import { Flex, Spacer, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthContext } from "../context/AuthContext";

export const Header = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const handleLogout = () => {
    signOut(auth);
    router.push("/login");
  };
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
      {user && (
        <Button
          onClick={handleLogout}
          type="button"
          color={"white"}
          bg={"gray.400"}
          borderRadius={"50px"}
          h="40px"
          width={"100px"}
        >
          LOGOUT
        </Button>
      )}
    </Flex>
  );
};
