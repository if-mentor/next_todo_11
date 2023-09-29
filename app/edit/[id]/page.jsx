"use client";

import {
  Heading,
  Box,
  Button,
  Text,
  Input,
  Flex,
  Textarea,
  FormControl,
} from "@chakra-ui/react";
import { BackButton } from "../../components/button/BackButton";
import { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import db from "../../../firebase";
import { useRouter } from "next/navigation";
import { dateFormat } from "../../../utils/dateFormat";

export default function Edit({ params }) {
  const router = useRouter();
  const [todo, setTodo] = useState({
    Task: "",
    Detail: "",
    Create: "",
    Update: "",
  });

  const fetchData = async () => {
    try {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      const data = { ...docSnap.data() };
      setTodo({
        Task: data.Task,
        Detail: data.Detail,
        Create: dateFormat(data.Create),
        Update: dateFormat(data.Update),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const hendleInputChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirm("更新してよろしいですか？")) {
      const docRef = doc(db, "posts", params.id);
      await updateDoc(docRef, {
        Task: todo.Task,
        Detail: todo.Detail,
        Update: serverTimestamp(),
      });
      router.push("/top");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* 中身 */}
      <Box border={5} p={20} pt={5}>
        {/* Backボタン */}
        <Flex justify="end">
          <BackButton />
        </Flex>
        {/* Backボタン */}

        {/* TODOのタイトル設定 */}
        <FormControl onSubmit={handleSubmit}>
          <Heading as="h4" size="md">
            TITLE
          </Heading>
          <Input
            name="Task"
            value={todo.Task}
            rounded={8}
            h={16}
            size="md"
            placeholder="Text"
            _placeholder={{ color: "gray", fontWeight: "bold", textAlign: "" }}
            onChange={hendleInputChange}
          />
          {/* TODOのタイトル設定 */}

          {/* 詳細部分 */}
          <Heading as="h4" size="md" mt="15px">
            DETAIL
          </Heading>
          <Textarea
            name="Detail"
            value={todo.Detail}
            rounded={8}
            rows={10}
            resize="none"
            size="md"
            placeholder="Text"
            _placeholder={{ color: "gray", fontWeight: "bold" }}
            onChange={hendleInputChange}
          />
          {/* 詳細部分 */}

          {/* 時間 */}
          <Flex>
            {/* Createの時間 */}
            <Box pr={5}>
              <Text fontSize="md" fontWeight="bold" mt="15px">
                Create
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {todo.Create}
              </Text>
            </Box>
            {/* Createの時間 */}

            {/* Updateの時間 */}
            <Box>
              <Text fontSize="md" fontWeight="bold" mt="15px">
                Update
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {todo.Update}
              </Text>
            </Box>
            {/* Updateの時間 */}
          </Flex>
          {/* 時間 */}

          {/* UPDATEボタン */}
          <Flex justify="end">
            <Button
              onClick={handleSubmit}
              px={5}
              background={"green.500"}
              border="1px"
              borderColor="green.900"
              rounded="full"
              fontSize={18}
              color="white"
            >
              UPDATE
            </Button>
          </Flex>
        </FormControl>
        {/* UPDATEボタン */}
      </Box>
      {/* 中身 */}
    </div>
  );
}
