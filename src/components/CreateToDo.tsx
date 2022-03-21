import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState, IToDo } from "../atoms";

let todos = [] as any;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const getTodo = window.localStorage.getItem("Todooos");
  const parsedTodo = JSON.parse(getTodo as any);
  todos = parsedTodo === null ? [] : parsedTodo;
  const setTodo = () =>
    window.localStorage.setItem("Todooos", JSON.stringify(todos));
  const ToDos = useRecoilValue(toDoState);
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

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
