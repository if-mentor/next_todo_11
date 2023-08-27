"use client";

import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Spacer,
  } from '@chakra-ui/react'

const Show = () => {
  return (
    <>
      <Heading
        bg="#68D391"
        h="50px"
        mb={5}
        pl="50px"
        display="flex"
        alignItems="center"
      >
        TODO
      </Heading>
      <Box ml='40px' mr='40px' maxW='1080px'>{/* コンテンツ部分の最大幅と横の余白 */}
        <Flex mb='20px' justify="end">
          <Button
          mr='20px'
          w='90px'
          bgColor="green.700"
          rounded="full"
          color='white'
          textAlign="center">
            Comment
          </Button>
          <Button
          w='90px'
          bgColor="green.300"
          rounded="full"
          textAlign="center">
            Back
          </Button>
        </Flex>
        <Flex>
          <Box w='55%' border='1px' borderColor='gray' p={2} mr='20px' borderRadius='10px' >
            <Box bg="#68D391">
              <Text as='b'>TITLE</Text>
            </Box>                        
            <Text mb='20px'>ここにテキストが入ります。</Text>
            <Box bg="#68D391">
              <Text as='b'>DETAIL</Text>
            </Box> 
            <Text mb='20px'>
              ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。
            </Text>
            <Flex mb='20px'>
              <Button w='25%' mr='30px'
              bgColor="green.300"
              rounded="full"
              textAlign="center">
                Edit
              </Button>
              <Box w='35%'>
                <Text>Create</Text>
                <Text>yyyy-mm-dd-tt:tt</Text>
              </Box>
              <Box w='35%'>
                <Text>Update</Text>
                <Text>yyyy-mm-dd-tt:tt</Text>
              </Box>
            </Flex>
          </Box> 
          <Box mb='20px' border='1px' borderColor='gray' h='120px' w='45%'borderRadius='5px'>
            <Flex bgColor="green.700" color='white' px={3}>
              <Text>ジョン</Text>
              <Spacer />
              <Text>yyyy/mm/dd</Text>
            </Flex>
            <Text px={2}>ここにテキストが入ります。</Text>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Show;