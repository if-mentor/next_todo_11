"use client";

import {
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  HStack,
  Button,
  Select,
  Input,
  InputRightElement,
  InputGroup,
  IconButton,
  Icon,
  VStack,
  Spacer,
} from "@chakra-ui/react";

const Top = () => {
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
      <Box px={20} py={6}>
        <HStack mb={4}>
          <HStack spacing={2}>
            <FormControl>
              <FormLabel>SEARCH</FormLabel>
              <InputGroup size="sm">
                <InputRightElement>
                  <IconButton size="sm" />
                </InputRightElement>
                <Input placeholder="タスクを検索" />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>STATUS</FormLabel>
              <Select placeholder="状態を選択" size="sm">
                <option>未完了</option>
                <option>完了</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>PRIORITY</FormLabel>
              <Select placeholder="重要度を選択" size="sm">
                <option>高</option>
                <option>中</option>
                <option>低</option>
              </Select>
            </FormControl>
            <Box>
              <Button variant="outline" colorScheme="gray" rounded="full">
                RESET
              </Button>
            </Box>
          </HStack>
          <Spacer />
          <Box>
            <Button colorScheme="teal" rounded="full" mr={2}>
              Task作成
            </Button>
          </Box>
        </HStack>
        <TableContainer>
          <Table variant="simple">
            <Thead bgColor="green.300">
              <Tr>
                <Th width="40%">Task</Th>
                <Th width="12%">Status</Th>
                <Th width="12%">Priority</Th>
                <Th width="12%">作成日</Th>
                <Th width="12%">更新日</Th>
                <Th width="12%">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* TODO: Taskデータをここにマップして表示 */}
              <Tr>
                <Td width="40%" p={1}>Next.jsでTodoサイトを作成</Td>
                <Td width="12%" p={1}>
                  <Box p={2} bgColor="green.100" rounded="full" textAlign="center">
                    DOING
                  </Box>
                </Td>
                <Td width="12%" p={1}>
                  <Select size="sm">
                  <option>高</option>
                  <option>中</option>
                  <option>低</option>
                  </Select>
                </Td>
                <Td width="12%" p={1}>yyyy-mm-dd</Td>
                <Td width="12%" p={1}>yyyy-mm-dd</Td>
                <Td width="12%" p={1}>
                  <IconButton size="xs" ml={4} />
                  <IconButton size="xs" ml={4} />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Top;
