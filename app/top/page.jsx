"use client";

import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import { Heading, FormControl, FormLabel, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, HStack, Button, Select, Input, InputRightElement, InputGroup, IconButton, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react";

const Top = () => {

  // const [todo, setTodo] = useState({
  //   id: "",
  //   text
  // })

  //const docRef = doc(db, )

  //画面遷移のためのuseRouter
  const router = useRouter();

  //firebaseからデータを取得する
  useEffect

  //Editページに遷移する関数
  const linkToEdit = () => {
    //firebaseからデータを取得
    //useRouterを使用した動的なページネーションの設定
    //router.push(/edit/[id]/${id})
  }

  //Showページに遷移する関数
  const linkToShow = () => {
    //useRouterを使用した動的なページネーションの設定
    //router.push(/show/[id]/${id})
  }

  //Deleteボタン押下時に動く関数
  const DeleteTodo = () => {

  }

  return (
    <>
    {/* header */}
      <Heading bg="#68D391" h="50px" mb={5} pl="50px" display="flex" alignItems="center">
        TODO
      </Heading>
    {/* header */}

    {/* 中身 */}
      <Box px={20} py={6}>
        <HStack mb={4}>

          {/* 検索部分 */}
          <HStack spacing={2}>

            {/* SEARCH部分 */}
            <FormControl>
              <FormLabel>SEARCH</FormLabel>
              <InputGroup size="sm">
                <InputRightElement>
                  <IconButton icon={<SearchIcon />} size="sm" />
                </InputRightElement>
                <Input placeholder="タスクを検索" />
              </InputGroup>
            </FormControl>
            {/* SEARCH部分 */}

            {/* STATUS部分 */}
            <FormControl>
              <FormLabel>STATUS</FormLabel>
              <Select placeholder="状態を選択" size="sm">
                <option>未完了</option>
                <option>完了</option>
              </Select>
            </FormControl>
            {/* STATUS部分 */}

            {/* PRIORITY部分 */}
            <FormControl>
              <FormLabel>PRIORITY</FormLabel>
              <Select placeholder="重要度を選択" size="sm">
                <option>高</option>
                <option>中</option>
                <option>低</option>
              </Select>
            </FormControl>
            {/* PRIORITY部分 */}

            {/* RESETボタン */}
            <Box>
              <Button variant="outline" colorScheme="gray" rounded="full">
                RESET
              </Button>
            </Box>
            {/* RESETボタン */}
            
          </HStack>
          {/* 検索部分 */}

          <Spacer />

          {/* createボタン */}
          <Link href="/create">
            <Box>
              <IconButton icon={<AddIcon />} colorScheme="teal" rounded="full" mr={2}>
                Task作成
              </IconButton>
            </Box>
          </Link>
          {/* createボタン */}

        </HStack>

        {/* Todoリスト */}
        <TableContainer>
          <Table variant="simple">
            <Thead bgColor="green.300">

              {/* Todoリストのタイトル */}
              <Tr>
                <Th width="40%">Task</Th>
                <Th width="12%">Status</Th>
                <Th width="12%">Priority</Th>
                <Th width="12%">Create</Th>
                <Th width="12%">Update</Th>
                <Th width="12%">Action</Th>
              </Tr>
              {/* Todoリストのタイトル */}

            </Thead>
            <Tbody>
              {/* TODO: Taskデータをここにマップして表示 */}
              <Tr>
                <Td width="40%" p={1} onClick={linkToShow}>
                  Next.jsでTodoサイトを作成
                </Td>
                <Td width="12%" p={1}>
                  <Button p={2} bgColor="green.100" rounded="full" textAlign="center">
                    DOING
                  </Button>
                </Td>
                <Td width="12%" p={1}>
                  <Select size="sm">
                    <option>high</option>
                    <option>middle</option>
                    <option>low</option>
                  </Select>
                </Td>
                <Td width="12%" p={1}>
                  yyyy-mm-dd hh:mm
                </Td>
                <Td width="12%" p={1}>
                  yyyy-mm-dd hh:mm
                </Td>
                <Td width="12%" p={1}>
                  <></>
                  <IconButton icon={<EditIcon />} size="xs" ml={4} onClick={linkToEdit} />
                  <IconButton icon={<DeleteIcon />} size="xs" ml={4} onClick={DeleteTodo}/>
                </Td>
              </Tr>
            </Tbody>
            {/* TODO: ページネーション機能挿入予定 */}
          </Table>
        </TableContainer>
        {/* Todoリスト */}

      </Box>
      {/* 中身 */}

    </>
  );
};

export default Top;
