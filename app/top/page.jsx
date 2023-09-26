"use client";

import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  HStack,
  Button,
  Select,
  Input,
  InputRightElement,
  InputGroup,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../firebase";
import { format } from "date-fns";
import Link from "next/link";

const Top = () => {
  //状態
  const [todos, setTodos] = useState([]);
  //画面遷移用
  const router = useRouter();
  //Priority検索用
  const [selectedPriority, setSelectedPriority] = useState("");
  // Status検索用
  const [selectedStatus, setSelectedStatus] = useState("");
  // 検索用ボタンを空に設定
  const initialPriority = "";
  const initialStatus = "";


  //firebaseからデータを取得する
  useEffect(() => {
    const todoData = collection(db, "posts");
    //Updateを基準に降順で取得
    const q = query(todoData, orderBy("Update", "desc"));
    getDocs(q).then((snapShot) => {
      const getTodoData = snapShot.docs.map((doc) => {
        console.log("documentData", doc.data());
        console.log("時間", new Date(doc.data().Create.toDate()));

        return {
          Create: format(
            new Date(doc.data().Create.toDate()),
            "yyyy-MM-dd HH:mm"
          ),
          Detail: doc.data().Detail,
          Id: doc.data().Id,
          Priority: doc.data().Priority,
          Status: doc.data().Status,
          Task: doc.data().Task,
          Update: format(
            new Date(doc.data().Update.toDate()),
            "yyyy-MM-dd HH:mm"
          ),
        };
      });
      setTodos(getTodoData);
      // console.log(todos)
    });
  }, []);

  //Createページに遷移する関数
  const linkToCreate = () => {
    //useRouterを使用した動的なページネーションの設定
    router.push("/create");
  };

  //Editページに遷移する関数
  const linkToEdit = (Id) => {
    //useRouterを使用した動的なページネーションの設定
    router.push(`/edit/${Id}`);
  };

  //Deleteボタン押下時に動く関数
  const DeleteTodo = (Id) => {
    //firebaseの中のデータを削除する（バック側）
    deleteDoc(doc(db, "posts", Id));
    //表示するための処理（フロント側）
    const deleteTodo = todos.filter((todo) => todo.Id !== Id);
    setTodos(deleteTodo);
  };

  // 優先度に基づいてデータをフィルタリング
  // 状態と優先度の両方に基づいてデータをフィルタリング
  const filteredTodos = todos.filter((todo) => {
    switch (true) {
      // どちらも選択されていない場合、すべてのタスクを表示
      case selectedStatus === "" && selectedPriority === "":
        return true;
      // 状態が選択されておらず、優先度が選択されている場合
      case selectedStatus === "" && selectedPriority !== "":
        return todo.Priority === selectedPriority;
      // 状態が選択されており、優先度が選択されていない場合
      case selectedStatus !== "" && selectedPriority === "":
        return todo.Status === selectedStatus;
      // 両方が選択されている場合
      default:
        return todo.Status === selectedStatus && todo.Priority === selectedPriority;
    }
  });  

  //Resetボタン押下時に初期値にリセット
  const handleReset = () => {
    setSelectedPriority(initialPriority);
    setSelectedStatus(initialStatus); 
  };

  return (
    <>
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
              <Select 
              placeholder="---------" 
              size="sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="NOT STARTED">NOT STARTED</option>
                <option value="DOING">DOING</option>
                <option value="DONE">DONE</option>
              </Select>
            </FormControl>
            {/* STATUS部分 */}

            {/* PRIORITY部分 */}
            <FormControl>
              <FormLabel>PRIORITY</FormLabel>
              <Select 
              placeholder="---------" 
              size="sm"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Middle">Middle</option>
                <option value="Low">Low</option>
              </Select>
            </FormControl>
            {/* PRIORITY部分 */}

            {/* RESETボタン */}
            <Box>
              <Button 
              variant="outline" 
              colorScheme="gray" 
              rounded="full"
              onClick={handleReset}
              >
                RESET
              </Button>
            </Box>
            {/* RESETボタン */}
          </HStack>
          {/* 検索部分 */}

          <Spacer />

          {/* createボタン */}
          <Box>
            <IconButton
              icon={<AddIcon />}
              colorScheme="teal"
              rounded="full"
              mr={2}
              onClick={linkToCreate}
            >
              Task作成
            </IconButton>
          </Box>
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

            {/* Todoリスト */}
            <Tbody>
              {filteredTodos.map((todo) =>{
                return(
                  <Tr key={todo.Id}>
                    <Td width="40%" p={1}>
                      <Link
                        href={`/show/${todo.Id}`}
                        style={{ cursor: "pointer" }}
                      >
                        {todo.Task}
                      </Link>
                    </Td>
                    <Td width="12%" p={1}>
                      <Button
                        p={2}
                        bgColor="green.100"
                        rounded="full"
                        textAlign="center"
                      >
                        DOING
                      </Button>
                    </Td>
                    <Td width="12%" p={1}>
                      <Select size="sm">
                        <option value="High">high</option>
                        <option value="Middle">middle</option>
                        <option value="Low">low</option>
                      </Select>
                    </Td>
                    <Td width="12%" p={2}>
                      {todo.Create}
                    </Td>
                    <Td width="12%" p={2}>
                      {todo.Update}
                    </Td>
                    <Td width="12%" p={1}>
                      <IconButton
                        icon={<EditIcon />}
                        size="xs"
                        ml={4}
                        onClick={() => {
                          linkToEdit(todo.Id);
                        }}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        size="xs"
                        ml={4}
                        onClick={() => {
                          DeleteTodo(todo.Id);
                        }}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            {/* Todoリスト */}

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
