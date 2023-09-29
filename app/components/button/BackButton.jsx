"use client";

import { Button } from '@chakra-ui/react'
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  const linkToTop = () => {
    router.push("/top");
  };
  return (
    <>
      <Button
        onClick={linkToTop}
        w='90px'
        bgColor="green.300"
        rounded="full"
        textAlign="center"
        border='1px'
        borderColor='black'
      >
        Back
      </Button>
    </>
  );
};