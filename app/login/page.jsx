"use client";

import Head from "next/head";
import { Heading, Box, Button, Text, Input } from "@chakra-ui/react";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Team Development 11th" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box
        bg={"green.100"}
        m={"100px auto"}
        p={"60px"}
        width="50%"
        borderRadius={"40px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box>
          <Text fontWeight="bold" mb={2}>
            メールアドレス
          </Text>
          <Input
            type="email"
            placeholder="メールアドレス"
            id="email"
            value=""
            bg={"green.50"}
          />
        </Box>
        <Box mt={"24px"}>
          <Text fontWeight="bold" mb={2}>
            パスワード
          </Text>
          <Input
            type="password"
            placeholder="パスワード"
            id="password"
            value=""
            bg={"green.50"}
          />
        </Box>
        <Box mt={"24px"} textAlign={"center"}>
          <Button
            bg={"green.600"}
            borderColor={"green.600"}
            color={"white"}
            variant="solid"
            borderRadius={"100px"}
            width={"200px"}
          >
            SIGNUP
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Login;
