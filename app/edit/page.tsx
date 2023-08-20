'use client'

import { Heading, Box, Button, Text, Input, Flex, Textarea } from "@chakra-ui/react";


export default function Edit() {
  return(

    <div>
    {/* ヘッダー */}   
      <Box background={"green.300"} p={3} px={50}>
        <Heading as='h2' size='2xl'>
          TODO
        </Heading>
      </Box>
    {/* ヘッダー */}
  
    {/* 中身 */}
      <Box border={5} p={20} pt={5}>

      {/* Backボタン */}
        <Flex justify="end">
          <Button px={8} background={"green.300"} border='1px' borderColor='green.600' rounded="full">
            Back
          </Button>
        </Flex>
      {/* Backボタン */}

      {/* TODOのタイトル設定 */}
        <Heading as='h4' size='md'>
          TITLE
        </Heading>
          <Input
            defaultValue=""
            rounded={8}
            h={16}
            //onChange={handleChange}
            size='md'
            placeholder="Text"
            _placeholder={{ color: 'black', fontWeight: 'bold', textAlign: '' }}
          />
      {/* TODOのタイトル設定 */}

      {/* 詳細部分 */}
        <Heading as='h4' size='md' mt='15px'>
          DETAIL
        </Heading>
          <Textarea
            defaultValue=""
            rounded={8}
            rows={10}
            resize="none"
            //onChange={handleChange}
            size='md'
            placeholder="Text"
            _placeholder={{ color: 'black', fontWeight: 'bold' }}
          />
      {/* 詳細部分 */}

      {/* 時間 */}
        <Flex>

        {/* Createの時間 */} 
          <Box pr={5}>
            <Text fontSize="md" fontWeight="bold" mt='15px'>
              Create
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              2023-01-01 00:00
            </Text>
          </Box>
        {/* Createの時間 */}  

        {/* Updateの時間 */}
          <Box>
            <Text fontSize="md" fontWeight="bold" mt='15px'>
              Update
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              2023-01-01 00:00
            </Text>
          </Box>  
        {/* Updateの時間 */}

      </Flex>
      {/* 時間 */}

      {/* UPDATEボタン */}
      <Flex justify="end">
        <Button px={5} background={"green.500"} border='1px' borderColor='green.900' rounded="full" fontSize={18} color="white">
          UPDATE
        </Button>
      </Flex>
      {/* UPDATEボタン */}
    </Box>
    {/* 中身 */}
  </div>
  

  
  )
}