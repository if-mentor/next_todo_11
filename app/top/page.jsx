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
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../firebase";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import page from "./page.css";
import { dateFormat } from "../../utils/dateFormat";

const Top = () => {
  //状態
  const [todos, setTodos] = useState([]);
  //Priority検索用
  const [selectedPriority, setSelectedPriority] = useState("");
  // Status検索用
  const [selectedStatus, setSelectedStatus] = useState("");
  //画面遷移用
  const router = useRouter();

  // 検索用ボタンを空に設定
  const initialPriority = "";
  const initialStatus = "";

  //firebaseからデータを取得する
  const todoDataFromFirebase = async () => {
    const todoData = collection(db, "posts");
    //Updateを基準に降順で取得
    const q = query(todoData, orderBy("Update", "desc"));
    await getDocs(q).then((snapShot) => {
      const getTodoData = snapShot.docs.map((doc) => {
        const { Create, Detail, Id, Priority, Status, Task, Update } =
          doc.data();
        return {
          Create: dateFormat(Create),
          Detail,
          Id,
          Priority,
          Status,
          Task,
          Update: dateFormat(Update),
        };
      });
      setTodos(getTodoData);
    });
  };

  useEffect(() => {
    //Firebaseからデータをとってくる
    todoDataFromFirebase();
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
  const DeleteTodo = async (Id) => {
    //firebaseの中のデータを削除する（バック側）
    await deleteDoc(doc(db, "posts", Id));
    //表示するための処理（フロント側）
    todoDataFromFirebase();
  };

  //Priority選択時に動く関数
  const onChangeSubTodoPriority = async (Id, e) => {
    //該当するidのデータのPriorityとUpdateを更新する（バック側）
    await updateDoc(doc(db, "posts", Id), {
      Priority: e.target.value,
      Update: Timestamp.now(),
    });
    //表示するための処理（フロント側）
    todoDataFromFirebase();
  };
  //Statusボタンを押下時に動く関数
  const onClickStatus = async (Id, Status) => {
    //Statusの内容を変更する
    switch (Status) {
      case "NOT STARTED": //NOT STARTED → DOING
        //変更したStatusの内容をFirebaseに更新する
        await updateDoc(doc(db, "posts", Id), {
          Status: "DOING",
          Update: Timestamp.now(),
        });
        //表示するための処理（フロント側）
        todoDataFromFirebase();
        break;
      case "DOING": //DOING → DONE
        //変更したStatusの内容をFirebaseに更新する
        await updateDoc(doc(db, "posts", Id), {
          Status: "DONE",
          Update: Timestamp.now(),
        });
        //表示するための処理（フロント側）
        todoDataFromFirebase();
        break;
      case "DONE": //DONE → NOT STARTED
        //変更したStatusの内容をFirebaseに更新する
        await updateDoc(doc(db, "posts", Id), {
          Status: "NOT STARTED",
          Update: Timestamp.now(),
        });
        //表示するための処理（フロント側）
        todoDataFromFirebase();
        break;
    }
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
        return (
          todo.Status === selectedStatus && todo.Priority === selectedPriority
        );
    }
  });

  //Resetボタン押下時に初期値にリセット
  const handleReset = () => {
    setSelectedPriority(initialPriority);
    setSelectedStatus(initialStatus);
  };

  //Top画面に表示するTodoリストの数
  const itemsPerPage = 6;
  //ページ数の状態
  const [itemsOffset, setItemsOffset] = useState(0);
  //ページ内の最後にあるTodoが何番目になるか
  const endOffset = itemsOffset + itemsPerPage;

  const currentAlbums = filteredTodos.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(filteredTodos.length / itemsPerPage);

  //ページネーションのための関数
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % filteredTodos.length;
    setItemsOffset(newOffset);
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
        <Box>
          <TableContainer variant="simple" height="335px">
            <Table>
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
              {/* Todo */}
              <Tbody>
                {currentAlbums.map((todo) => {
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
                        {todo.Status === "NOT STARTED" && (
                          <Button
                            p={2}
                            width={100}
                            fontSize={4}
                            bgColor="green.50"
                            rounded="full"
                            textAlign="center"
                            onClick={() => onClickStatus(todo.Id, todo.Status)}
                          >
                            {todo.Status}
                          </Button>
                        )}
                        {todo.Status === "DOING" && (
                          <Button
                            p={2}
                            width={100}
                            fontSize={4}
                            bgColor="green.200"
                            rounded="full"
                            textAlign="center"
                            onClick={() => onClickStatus(todo.Id, todo.Status)}
                          >
                            {todo.Status}
                          </Button>
                        )}
                        {todo.Status === "DONE" && (
                          <Button
                            p={2}
                            width={100}
                            fontSize={4}
                            bgColor="green.500"
                            rounded="full"
                            textAlign="center"
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
              {/* Todo */}
            </Table>
          </TableContainer>
          {/* Todoリスト */}
        </Box>
        {/* ページネーション機能 */}
        <Box display="flex" justifyContent="center">
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            previousLabel="<"
            nextLabel=">"
            pageLinkClassName="page-item"
            previousLinkClassName="page-item-nextAndPrevious"
            nextLinkClassName="page-item-nextAndPrevious"
            breakLabel="..."
            breakLinkClassName="page-item-disablebutton"
            containerClassName="pagination"
            activeLinkClassName="active"
          />
        </Box>
        {/* ページネーション機能 */}
      </Box>
      {/* 中身 */}
    </>
  );
};

export default Top;
