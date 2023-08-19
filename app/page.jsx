'use client'

import { Button } from "@chakra-ui/react";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      Hello, Team Development #11
      <br />
      <Link href="/edit">edit</Link>
      <br />
      <Link href="/create">create</Link>
      <br />
      <Button colorScheme='blue'>Button</Button>
    </div>
  )
}

export default Home;