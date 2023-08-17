"use client";
/*
use client がないと以下のエラーが出る（shogoさんに見てもらった時たぶんこれが抜けてた）
---------
./node_modules/@chakra-ui/react/dist/index.mjs
Error: It's currently unsupported to use "export *" in a client boundary. Please use named exports instead.
---------
*/
import Head from "next/head";
import Link from "next/link";
import { Heading, Box, Button, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name="description" content="Team Development 11th" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Heading
        bg="#68D391"
        h="50px"
        pl="50px"
        display="flex"
        alignItems="center"
      >
        TODO
      </Heading>

      <Box align="center" my={24}>
        <Text fontSize="4xl" lineHeight={1} fontWeight="700">
          404
        </Text>
        <Text fontSize="lg" my={5}>
          This is not the web page you are looking for.
        </Text>
        <Link href={"/"}>
          <Button
            background={"#68D391"}
            borderColor={"#68D391"}
            color={"white"}
            variant="solid"
          >
            TOP
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default NotFound;