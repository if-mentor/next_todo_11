"use client";

import {Input, Textarea, Button, FormControl, FormLabel, Box, Text,Center,Container,Card} from '@chakra-ui/react'

const ModalPage = () => {
  return (
    <>
      <Center>
        <Box
        w='480px' h='620px'
        px={5} py={5} mt="120px"
        border='1px' borderColor='gray' 
        borderRadius='10px'>
          <Text fontSize='5xl' as='b'>Comment</Text>
          <FormControl mt='24px' mb='10px'>
            <FormLabel>NAME</FormLabel>
            <Input size='lg' />
          </FormControl>
          <FormControl marginBottom="16px">
            <FormLabel>Your Comment</FormLabel>
            <Textarea  h='300px' />
          </FormControl>

          <Button colorScheme='teal' w='100%'>
            CREATE
          </Button>
        </Box>
      </Center>
    </>
  )
}

export default ModalPage;