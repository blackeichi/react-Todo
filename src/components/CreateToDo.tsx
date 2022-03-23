import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";
import { motion } from "framer-motion";
import { useState } from "react";

let todos = [] as any;

const TodoForm = styled.div`
  border: none;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const getTodo = window.localStorage.getItem("Todooos");
  const parsedTodo = JSON.parse(getTodo as any);
  todos = parsedTodo === null ? [] : parsedTodo;
  const setTodo = () =>
    window.localStorage.setItem("Todooos", JSON.stringify(todos));
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      //ToDoList.tsx에 select에 따라 category의 값이 변함. 현재 선택된 값이 들어감
      ...oldToDos,
    ]);
    const todo = {
      text: toDo,
      category,
      id: Date.now(),
    };
    todos.push(todo);
    setTodo();
    setValue("toDo", "");
  };
  const [clickAdd, setClick] = useState(false);
  const toggleClick = () => {
    setClick(true);
  };
  return (
    <TodoForm>
      <motion.button
        onClick={toggleClick}
        animate={{
          x: clickAdd ? 70 : 0,
          display: clickAdd ? "none" : "block",
        }}
        exit={{ display: clickAdd ? "none" : "flex" }}
        transition={{ type: "just" }}
        style={{
          position: "absolute",
          top: "10px",
          width: "30px",
          zIndex: "1",
        }}
      >
        +
      </motion.button>
      <form
        style={{ display: "flex", position: "relative" }}
        onSubmit={handleSubmit(handleValid)}
      >
        <motion.input
          initial={{ scaleX: 0 }}
          animate={{ scaleX: clickAdd ? 1 : 0 }}
          {...register("toDo", {
            required: "Please write a To Do",
          })}
        />
        <motion.button
          initial={{ scaleX: 0 }}
          animate={{ x: clickAdd ? 0 : -70, scaleX: clickAdd ? 1 : 0 }}
          style={{ position: "absolute", top: "3px", right: "0" }}
        >
          Add
        </motion.button>
      </form>
    </TodoForm>
  );
}

export default CreateToDo;
