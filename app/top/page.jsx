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
  serverTimestamp,
  updateDoc,
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

  //firebaseからデータを取得する
  useEffect(() => {
    const todoData = collection(db, "posts");
    //Updateを基準に降順で取得
    const q = query(todoData, orderBy("Update", "desc"));
    getDocs(q).then((snapShot) => {
      const getTodoData = snapShot.docs.map((doc) => {
        // console.log("documentData", doc.data());
        // console.log("時間", new Date(doc.data().Create.toDate()));
        const { Create, Detail, Id, Priority, Status, Task, Update } =
          doc.data();
        return { Create, Detail, Id, Priority, Status, Task, Update };
      });
      setTodos(getTodoData);
      // console.log(todos)
    });
  }, []);

  //Createページに遷移する関数
  const linkToCreate = () => {
    router.push("/create");
  };

  //Editページに遷移する関数
  const linkToEdit = (Id) => {
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

  //Priority選択時に動く関数
  const onChangeSubTodoPriority = (Id, e) => {
    //該当するidのデータのPriorityとUpdateを更新する（バック側）
    updateDoc(doc(db, "posts", Id), {
      Priority: e.target.value,
      Update: serverTimestamp(),
    });
    // console.log(Id);
    //該当するidのデータのPriorityとUpdateを更新する（フロント側）
    const updateDate = format(new Date(), "yyyy-MM-dd HH:mm");
    const priorityChangeTodo = todos.map((todo) => {
      return todo.Id === Id
        ? { ...todo, Priority: e.target.value, Update: updateDate }
        : todo;
    });
    setTodos(priorityChangeTodo);
    // location.reload();
  };

  //Statusボタンを押下時にStatusが変更される
  const onClickStatus = (Id, Status) => {
    //Statusの内容を変更する
    // console.log(Status);
    switch (Status) {
      case "NOT STARTED":
        //NOT STARTED → DOING
        //変更したStatusの内容をFirebaseに更新する
        updateDoc(doc(db, "posts", Id), {
          Status: "DOING",
          Update: serverTimestamp(),
        });
        //該当するidのデータのStatusとUpdateを更新する（フロント側）
        const updateDoingDate = format(new Date(), "yyyy-MM-dd HH:mm");
        const changeDoingTodo = todos.map((todo) => {
          return todo.Id === Id
            ? { ...todo, Status: "DOING", Update: updateDoingDate }
            : todo;
        });
        setTodos(changeDoingTodo);
        // location.reload();
        break;
      case "DOING":
        //DOING → DONE
        //変更したStatusの内容をFirebaseに更新する
        const updateDoneDate = format(new Date(), "yyyy-MM-dd HH:mm");
        updateDoc(doc(db, "posts", Id), {
          Status: "DONE",
          Update: serverTimestamp(),
        });
        //該当するidのデータのStatusとUpdateを更新する（フロント側）
        const changeDoneTodo = todos.map((todo) => {
          return todo.Id === Id
            ? { ...todo, Status: "DONE", Update: updateDoneDate }
            : todo;
        });
        setTodos(changeDoneTodo);
        // location.reload();
        break;
      case "DONE":
        //DONE → NOT STARTED
        //変更したStatusの内容をFirebaseに更新する
        updateDoc(doc(db, "posts", Id), {
          Status: "NOT STARTED",
          Update: serverTimestamp(),
        });
        //該当するidのデータのStatusとUpdateを更新する（フロント側）
        const updateNotStartedDate = format(new Date(), "yyyy-MM-dd HH:mm");
        const changeNotStartedTodo = todos.map((todo) => {
          return todo.Id === Id
            ? { ...todo, Status: "NOT STARTED", Update: updateNotStartedDate }
            : todo;
        });
        setTodos(changeNotStartedTodo);
        // location.reload();
        break;
    }
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
              {todos.map((todo) => {
                return (
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
                      {todo.Status === "NOT STARTED" ? (
                        <Button
                          p={2}
                          width={100}
                          fontSize={4}
                          bgColor="green.50"
                          rounded="full"
                          textAlign="center"
                          // id="btn"
                          onClick={() => onClickStatus(todo.Id, todo.Status)}
                        >
                          {todo.Status}
                        </Button>
                      ) : todo.Status === "DOING" ? (
                        <Button
                          p={2}
                          width={100}
                          fontSize={4}
                          bgColor="green.200"
                          rounded="full"
                          textAlign="center"
                          // id="btn"
                          onClick={() => onClickStatus(todo.Id, todo.Status)}
                        >
                          {todo.Status}
                        </Button>
                      ) : (
                        <Button
                          p={2}
                          width={100}
                          fontSize={4}
                          bgColor="green.500"
                          rounded="full"
                          textAlign="center"
                          // id="btn"
                          onClick={() => onClickStatus(todo.Id, todo.Status)}
                        >
                          {todo.Status}
                        </Button>
                      )}
                    </Td>
                    <Td width="12%" p={1}>
                      <Select
                        size="sm"
                        value={todo.Priority}
                        onChange={(e) => onChangeSubTodoPriority(todo.Id, e)}
                      >
                        <option value="High">High</option>
                        <option value="Middle">Middle</option>
                        <option value="Low">Low</option>
                      </Select>
                    </Td>
                    <Td width="12%" p={2}>
                      {format(
                        new Date(todo.Create.toDate()),
                        "yyyy-MM-dd HH:mm"
                      )}
                    </Td>
                    <Td width="12%" p={2}>
                      {format(
                        new Date(todo.Update.toDate()),
                        "yyyy-MM-dd HH:mm"
                      )}
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
