"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { Header } from "./components/header";

export function Providers({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <Header />
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
